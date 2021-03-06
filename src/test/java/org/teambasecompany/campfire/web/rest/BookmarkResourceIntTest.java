package org.teambasecompany.campfire.web.rest;

import com.google.common.collect.ImmutableList;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.teambasecompany.campfire.CampFireApp;
import org.teambasecompany.campfire.domain.Bookmark;
import org.teambasecompany.campfire.domain.Team;
import org.teambasecompany.campfire.domain.User;
import org.teambasecompany.campfire.domain.UserDetails;
import org.teambasecompany.campfire.repository.BookmarkRepository;
import org.teambasecompany.campfire.repository.TeamRepository;
import org.teambasecompany.campfire.repository.UserDetailsRepository;
import org.teambasecompany.campfire.service.dto.BookmarkDTO;
import org.teambasecompany.campfire.service.mapper.BookmarkMapper;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasItems;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BookmarkResource REST controller.
 *
 * @see BookmarkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CampFireApp.class)
public class BookmarkResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final List<String> DEFAULT_TAGS = ImmutableList.of("AAAAAAAAAA");
    private static final List<String> UPDATED_TAGS = ImmutableList.of("BBBBBBBBBB");

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private BookmarkMapper bookmarkMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc restBookmarkMockMvc;

    private Bookmark bookmark;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        this.restBookmarkMockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .apply(springSecurity())
            .build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bookmark createEntity() {
        Bookmark bookmark = new Bookmark()
            .name(DEFAULT_NAME)
            .url(DEFAULT_URL)
            .tags(DEFAULT_TAGS);
        return bookmark;
    }

    @Before
    public void initTest() {
        bookmarkRepository.deleteAll();
        userDetailsRepository.deleteAll();
        teamRepository.deleteAll();
        bookmark = createEntity();
    }

    @Test
    @WithMockUser
    public void createBookmark() throws Exception {
        int databaseSizeBeforeCreate = bookmarkRepository.findAll().size();

        // Create the Bookmark
        BookmarkDTO bookmarkDTO = bookmarkMapper.toDto(bookmark);
        restBookmarkMockMvc.perform(post("/api/bookmarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookmarkDTO)))
            .andExpect(status().isCreated());

        // Validate the Bookmark in the database
        List<Bookmark> bookmarkList = bookmarkRepository.findAll();
        assertThat(bookmarkList).hasSize(databaseSizeBeforeCreate + 1);
        Bookmark testBookmark = bookmarkList.get(bookmarkList.size() - 1);
        assertThat(testBookmark.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBookmark.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @WithMockUser
    public void createBookmarkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookmarkRepository.findAll().size();

        // Create the Bookmark with an existing ID
        bookmark.setId("existing_id");
        BookmarkDTO bookmarkDTO = bookmarkMapper.toDto(bookmark);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookmarkMockMvc.perform(post("/api/bookmarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookmarkDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bookmark in the database
        List<Bookmark> bookmarkList = bookmarkRepository.findAll();
        assertThat(bookmarkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @WithMockUser
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookmarkRepository.findAll().size();
        // set the field null
        bookmark.setName(null);

        // Create the Bookmark, which fails.
        BookmarkDTO bookmarkDTO = bookmarkMapper.toDto(bookmark);

        restBookmarkMockMvc.perform(post("/api/bookmarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookmarkDTO)))
            .andExpect(status().isBadRequest());

        List<Bookmark> bookmarkList = bookmarkRepository.findAll();
        assertThat(bookmarkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @WithMockUser
    public void checkUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = bookmarkRepository.findAll().size();
        // set the field null
        bookmark.setUrl(null);

        // Create the Bookmark, which fails.
        BookmarkDTO bookmarkDTO = bookmarkMapper.toDto(bookmark);

        restBookmarkMockMvc.perform(post("/api/bookmarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookmarkDTO)))
            .andExpect(status().isBadRequest());

        List<Bookmark> bookmarkList = bookmarkRepository.findAll();
        assertThat(bookmarkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @WithMockUser(username = "test")
    public void getAllBookmarks() throws Exception {
        // Initialize the database
        UserDetails userDetails = new UserDetails();
        userDetails.setId("test");
        User user = new User();
        user.setId("test");
        userDetails.setUser(user);
        userDetailsRepository.save(userDetails);
        Team team = new Team();
        team.getMembers().add(userDetails);
        teamRepository.save(team);
        bookmark.setTeam(team);
        bookmarkRepository.save(bookmark);

        // Get all the bookmarkList
        restBookmarkMockMvc.perform(get("/api/bookmarks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bookmark.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].tags").value(hasItems(DEFAULT_TAGS)));
    }

    @Test
    @WithMockUser
    public void getBookmark() throws Exception {
        // Initialize the database
        bookmarkRepository.save(bookmark);

        // Get the bookmark
        restBookmarkMockMvc.perform(get("/api/bookmarks/{id}", bookmark.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bookmark.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.tags").value(DEFAULT_TAGS.get(0)));
    }

    @Test
    @WithMockUser
    public void getNonExistingBookmark() throws Exception {
        // Get the bookmark
        restBookmarkMockMvc.perform(get("/api/bookmarks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    public void updateBookmark() throws Exception {
        // Initialize the database
        bookmarkRepository.save(bookmark);

        int databaseSizeBeforeUpdate = bookmarkRepository.findAll().size();

        // Update the bookmark
        Bookmark updatedBookmark = bookmarkRepository.findById(bookmark.getId()).get();
        updatedBookmark
            .name(UPDATED_NAME)
            .url(UPDATED_URL)
            .tags(UPDATED_TAGS);
        BookmarkDTO bookmarkDTO = bookmarkMapper.toDto(updatedBookmark);

        restBookmarkMockMvc.perform(put("/api/bookmarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookmarkDTO)))
            .andExpect(status().isOk());

        // Validate the Bookmark in the database
        List<Bookmark> bookmarkList = bookmarkRepository.findAll();
        assertThat(bookmarkList).hasSize(databaseSizeBeforeUpdate);
        Bookmark testBookmark = bookmarkList.get(bookmarkList.size() - 1);
        assertThat(testBookmark.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBookmark.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testBookmark.getTags()).isEqualTo(UPDATED_TAGS);
    }

    @Test
    @WithMockUser
    public void updateNonExistingBookmark() throws Exception {
        int databaseSizeBeforeUpdate = bookmarkRepository.findAll().size();

        // Create the Bookmark
        BookmarkDTO bookmarkDTO = bookmarkMapper.toDto(bookmark);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookmarkMockMvc.perform(put("/api/bookmarks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookmarkDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bookmark in the database
        List<Bookmark> bookmarkList = bookmarkRepository.findAll();
        assertThat(bookmarkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @WithMockUser
    public void deleteBookmark() throws Exception {
        // Initialize the database
        bookmarkRepository.save(bookmark);

        int databaseSizeBeforeDelete = bookmarkRepository.findAll().size();

        // Get the bookmark
        restBookmarkMockMvc.perform(delete("/api/bookmarks/{id}", bookmark.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bookmark> bookmarkList = bookmarkRepository.findAll();
        assertThat(bookmarkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @WithMockUser
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bookmark.class);
        Bookmark bookmark1 = new Bookmark();
        bookmark1.setId("id1");
        Bookmark bookmark2 = new Bookmark();
        bookmark2.setId(bookmark1.getId());
        assertThat(bookmark1).isEqualTo(bookmark2);
        bookmark2.setId("id2");
        assertThat(bookmark1).isNotEqualTo(bookmark2);
        bookmark1.setId(null);
        assertThat(bookmark1).isNotEqualTo(bookmark2);
    }

    @Test
    @WithMockUser
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BookmarkDTO.class);
        BookmarkDTO bookmarkDTO1 = new BookmarkDTO();
        bookmarkDTO1.setId("id1");
        BookmarkDTO bookmarkDTO2 = new BookmarkDTO();
        assertThat(bookmarkDTO1).isNotEqualTo(bookmarkDTO2);
        bookmarkDTO2.setId(bookmarkDTO1.getId());
        assertThat(bookmarkDTO1).isEqualTo(bookmarkDTO2);
        bookmarkDTO2.setId("id2");
        assertThat(bookmarkDTO1).isNotEqualTo(bookmarkDTO2);
        bookmarkDTO1.setId(null);
        assertThat(bookmarkDTO1).isNotEqualTo(bookmarkDTO2);
    }
}
