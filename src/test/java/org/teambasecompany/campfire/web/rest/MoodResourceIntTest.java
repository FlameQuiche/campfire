package org.teambasecompany.campfire.web.rest;

import org.teambasecompany.campfire.CampFireApp;

import org.teambasecompany.campfire.domain.Mood;
import org.teambasecompany.campfire.repository.MoodRepository;
import org.teambasecompany.campfire.service.MoodService;
import org.teambasecompany.campfire.service.dto.MoodDTO;
import org.teambasecompany.campfire.service.mapper.MoodMapper;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static org.teambasecompany.campfire.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MoodResource REST controller.
 *
 * @see MoodResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CampFireApp.class)
public class MoodResourceIntTest {

    private static final Integer DEFAULT_RANK = 1;
    private static final Integer UPDATED_RANK = 2;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MoodRepository moodRepository;

    @Autowired
    private MoodMapper moodMapper;
    
    @Autowired
    private MoodService moodService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restMoodMockMvc;

    private Mood mood;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MoodResource moodResource = new MoodResource(moodService);
        this.restMoodMockMvc = MockMvcBuilders.standaloneSetup(moodResource)
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
    public static Mood createEntity() {
        Mood mood = new Mood()
            .rank(DEFAULT_RANK)
            .date(DEFAULT_DATE);
        return mood;
    }

    @Before
    public void initTest() {
        moodRepository.deleteAll();
        mood = createEntity();
    }

    @Test
    public void createMood() throws Exception {
        int databaseSizeBeforeCreate = moodRepository.findAll().size();

        // Create the Mood
        MoodDTO moodDTO = moodMapper.toDto(mood);
        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isCreated());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeCreate + 1);
        Mood testMood = moodList.get(moodList.size() - 1);
        assertThat(testMood.getRank()).isEqualTo(DEFAULT_RANK);
        assertThat(testMood.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    public void createMoodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moodRepository.findAll().size();

        // Create the Mood with an existing ID
        mood.setId("existing_id");
        MoodDTO moodDTO = moodMapper.toDto(mood);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkRankIsRequired() throws Exception {
        int databaseSizeBeforeTest = moodRepository.findAll().size();
        // set the field null
        mood.setRank(null);

        // Create the Mood, which fails.
        MoodDTO moodDTO = moodMapper.toDto(mood);

        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isBadRequest());

        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = moodRepository.findAll().size();
        // set the field null
        mood.setDate(null);

        // Create the Mood, which fails.
        MoodDTO moodDTO = moodMapper.toDto(mood);

        restMoodMockMvc.perform(post("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isBadRequest());

        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllMoods() throws Exception {
        // Initialize the database
        moodRepository.save(mood);

        // Get all the moodList
        restMoodMockMvc.perform(get("/api/moods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mood.getId())))
            .andExpect(jsonPath("$.[*].rank").value(hasItem(DEFAULT_RANK)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    public void getMood() throws Exception {
        // Initialize the database
        moodRepository.save(mood);

        // Get the mood
        restMoodMockMvc.perform(get("/api/moods/{id}", mood.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mood.getId()))
            .andExpect(jsonPath("$.rank").value(DEFAULT_RANK))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    public void getNonExistingMood() throws Exception {
        // Get the mood
        restMoodMockMvc.perform(get("/api/moods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMood() throws Exception {
        // Initialize the database
        moodRepository.save(mood);

        int databaseSizeBeforeUpdate = moodRepository.findAll().size();

        // Update the mood
        Mood updatedMood = moodRepository.findById(mood.getId()).get();
        updatedMood
            .rank(UPDATED_RANK)
            .date(UPDATED_DATE);
        MoodDTO moodDTO = moodMapper.toDto(updatedMood);

        restMoodMockMvc.perform(put("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isOk());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeUpdate);
        Mood testMood = moodList.get(moodList.size() - 1);
        assertThat(testMood.getRank()).isEqualTo(UPDATED_RANK);
        assertThat(testMood.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    public void updateNonExistingMood() throws Exception {
        int databaseSizeBeforeUpdate = moodRepository.findAll().size();

        // Create the Mood
        MoodDTO moodDTO = moodMapper.toDto(mood);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoodMockMvc.perform(put("/api/moods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(moodDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Mood in the database
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMood() throws Exception {
        // Initialize the database
        moodRepository.save(mood);

        int databaseSizeBeforeDelete = moodRepository.findAll().size();

        // Get the mood
        restMoodMockMvc.perform(delete("/api/moods/{id}", mood.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mood> moodList = moodRepository.findAll();
        assertThat(moodList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mood.class);
        Mood mood1 = new Mood();
        mood1.setId("id1");
        Mood mood2 = new Mood();
        mood2.setId(mood1.getId());
        assertThat(mood1).isEqualTo(mood2);
        mood2.setId("id2");
        assertThat(mood1).isNotEqualTo(mood2);
        mood1.setId(null);
        assertThat(mood1).isNotEqualTo(mood2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MoodDTO.class);
        MoodDTO moodDTO1 = new MoodDTO();
        moodDTO1.setId("id1");
        MoodDTO moodDTO2 = new MoodDTO();
        assertThat(moodDTO1).isNotEqualTo(moodDTO2);
        moodDTO2.setId(moodDTO1.getId());
        assertThat(moodDTO1).isEqualTo(moodDTO2);
        moodDTO2.setId("id2");
        assertThat(moodDTO1).isNotEqualTo(moodDTO2);
        moodDTO1.setId(null);
        assertThat(moodDTO1).isNotEqualTo(moodDTO2);
    }
}
