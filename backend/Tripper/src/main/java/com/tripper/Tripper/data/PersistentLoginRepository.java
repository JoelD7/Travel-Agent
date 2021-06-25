package com.tripper.Tripper.data;

import com.tripper.Tripper.models.PersistentLogin;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PersistentLoginRepository extends PagingAndSortingRepository<PersistentLogin, String> {

    public List<PersistentLogin> findByUsername(String username, Sort sort);

}
