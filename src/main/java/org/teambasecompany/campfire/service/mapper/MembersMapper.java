package org.teambasecompany.campfire.service.mapper;

import org.springframework.stereotype.Component;
import org.teambasecompany.campfire.domain.UserDetails;

import java.util.Set;

@Component
public class MembersMapper {
    public Integer map(Set<UserDetails> members) {
        return members.size();
    }
}
