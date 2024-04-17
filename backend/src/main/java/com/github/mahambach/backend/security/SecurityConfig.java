package com.github.mahambach.backend.security;

import com.github.mahambach.backend.model.enums.AppUserRole;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder(){
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
            .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                .requestMatchers(HttpMethod.POST, "/api/users/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/users/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/mapMarkerTypes").hasRole(AppUserRole.ADMIN.name())
                .requestMatchers(HttpMethod.PUT, "/api/mapMarkerTypes/*").hasRole(AppUserRole.ADMIN.name())
                .requestMatchers(HttpMethod.DELETE, "/api/mapMarkerTypes/*").hasRole(AppUserRole.ADMIN.name())
                .requestMatchers(RegexRequestMatcher.regexMatcher("^(?!/api).*$")).permitAll()
                .anyRequest().authenticated()
            )
            .logout(logout -> logout.logoutUrl("/api/users/logout")
                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(200))
            )
            .httpBasic(httpSecurityHttpBasicConfigurer -> httpSecurityHttpBasicConfigurer.authenticationEntryPoint(((request, response, authException) -> response.sendError(401))));

        return http.build();
    }
}
