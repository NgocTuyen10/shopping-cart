package com.example.comicsproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.comicsproject.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

	@Query(value = "SELECT * FROM account WHERE username=:q", nativeQuery = true)
	public Account findAccountByUsername(@Param("q") String userName);

	@Query(value = "select * from account where username = :username and password = :password", nativeQuery = true)
	public Account findAccount(@Param("username") String username, @Param("password") String password);

	@Modifying
	@Query(value = "insert into account(username,password) values (:p1,:p2)", nativeQuery = true)
	public void createAccount(@Param("p1") String username, @Param("p2") String password);
}
