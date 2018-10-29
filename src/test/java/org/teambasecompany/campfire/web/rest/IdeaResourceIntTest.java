package org.teambasecompany.campfire.web.rest;

import org.teambasecompany.campfire.CampFireApp;

import org.teambasecompany.campfire.domain.Idea;
import org.teambasecompany.campfire.repository.IdeaRepository;
import org.teambasecompany.campfire.service.IdeaService;
import org.teambasecompany.campfire.service.dto.IdeaDTO;
import org.teambasecompany.campfire.service.mapper.IdeaMapper;
import org.teambasecompany.campfire.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;


import static org.teambasecompany.campfire.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IdeaResource REST controller.
 *
 * @see IdeaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CampFireApp.class)
public class IdeaResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private IdeaRepository ideaRepository;

    @Autowired
    private IdeaMapper ideaMapper;
    
    @Autowired
    private IdeaService ideaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restIdeaMockMvc;

    private Idea idea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IdeaResource ideaResource = new IdeaResource(ideaService);
        this.restIdeaMockMvc = MockMvcBuilders.standaloneSetup(ideaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Idea createEntity() {
        Idea idea = new Idea()
            .description(DEFAULT_DESCRIPTION);
        return idea;
    }

    @Before
    public void initTest() {
        ideaRepository.deleteAll();
        idea = createEntity();
    }

    @Test
    public void createIdea() throws Exception {
        int databaseSizeBeforeCreate = ideaRepository.findAll().size();

        // Create the Idea
        IdeaDTO ideaDTO = ideaMapper.toDto(idea);
        restIdeaMockMvc.perform(post("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideaDTO)))
            .andExpect(status().isCreated());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeCreate + 1);
        Idea testIdea = ideaList.get(ideaList.size() - 1);
        assertThat(testIdea.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createIdeaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ideaRepository.findAll().size();

        // Create the Idea with an existing ID
        idea.setId("existing_id");
        IdeaDTO ideaDTO = ideaMapper.toDto(idea);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdeaMockMvc.perform(post("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ideaRepository.findAll().size();
        // set the field null
        idea.setDescription(null);

        // Create the Idea, which fails.
        IdeaDTO ideaDTO = ideaMapper.toDto(idea);

        restIdeaMockMvc.perform(post("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideaDTO)))
            .andExpect(status().isBadRequest());

        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllIdeas() throws Exception {
        // Initialize the database
        ideaRepository.save(idea);

        // Get all the ideaList
        restIdeaMockMvc.perform(get("/api/ideas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(idea.getId())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    public void getIdea() throws Exception {
        // Initialize the database
        ideaRepository.save(idea);

        // Get the idea
        restIdeaMockMvc.perform(get("/api/ideas/{id}", idea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(idea.getId()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    public void getNonExistingIdea() throws Exception {
        // Get the idea
        restIdeaMockMvc.perform(get("/api/ideas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateIdea() throws Exception {
        // Initialize the database
        ideaRepository.save(idea);

        int databaseSizeBeforeUpdate = ideaRepository.findAll().size();

        // Update the idea
        Idea updatedIdea = ideaRepository.findById(idea.getId()).get();
        updatedIdea
            .description(UPDATED_DESCRIPTION);
        IdeaDTO ideaDTO = ideaMapper.toDto(updatedIdea);

        restIdeaMockMvc.perform(put("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideaDTO)))
            .andExpect(status().isOk());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeUpdate);
        Idea testIdea = ideaList.get(ideaList.size() - 1);
        assertThat(testIdea.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingIdea() throws Exception {
        int databaseSizeBeforeUpdate = ideaRepository.findAll().size();

        // Create the Idea
        IdeaDTO ideaDTO = ideaMapper.toDto(idea);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIdeaMockMvc.perform(put("/api/ideas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ideaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Idea in the database
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteIdea() throws Exception {
        // Initialize the database
        ideaRepository.save(idea);

        int databaseSizeBeforeDelete = ideaRepository.findAll().size();

        // Get the idea
        restIdeaMockMvc.perform(delete("/api/ideas/{id}", idea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Idea> ideaList = ideaRepository.findAll();
        assertThat(ideaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Idea.class);
        Idea idea1 = new Idea();
        idea1.setId("id1");
        Idea idea2 = new Idea();
        idea2.setId(idea1.getId());
        assertThat(idea1).isEqualTo(idea2);
        idea2.setId("id2");
        assertThat(idea1).isNotEqualTo(idea2);
        idea1.setId(null);
        assertThat(idea1).isNotEqualTo(idea2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IdeaDTO.class);
        IdeaDTO ideaDTO1 = new IdeaDTO();
        ideaDTO1.setId("id1");
        IdeaDTO ideaDTO2 = new IdeaDTO();
        assertThat(ideaDTO1).isNotEqualTo(ideaDTO2);
        ideaDTO2.setId(ideaDTO1.getId());
        assertThat(ideaDTO1).isEqualTo(ideaDTO2);
        ideaDTO2.setId("id2");
        assertThat(ideaDTO1).isNotEqualTo(ideaDTO2);
        ideaDTO1.setId(null);
        assertThat(ideaDTO1).isNotEqualTo(ideaDTO2);
    }
}
