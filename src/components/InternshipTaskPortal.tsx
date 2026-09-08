import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Database, 
  CheckSquare, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Terminal, 
  Layers, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INTERNSHIP_TASK_DATA } from '../data/mockData';

export const InternshipTaskPortal: React.FC = () => {
  const { isTaskPortalOpen, setIsTaskPortalOpen, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'java-code' | 'sql-schema' | 'submission'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isTaskPortalOpen) return null;

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    showToast('Copied to clipboard! 📋');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Sample Java Source Files for Inspector
  const JAVA_FILES: { filename: string; code: string }[] = [
    {
      filename: 'FoodDeliveryApplication.java',
      code: `package com.fooddelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodDeliveryApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodDeliveryApplication.class, args);
        System.out.println("🚀 Food Delivery Application Started on Port 8080!");
    }
}`
    },
    {
      filename: 'SecurityConfig.java',
      code: `package com.fooddelivery.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/restaurants/**", "/register", "/login", "/css/**", "/js/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/restaurants")
                .permitAll()
            )
            .logout(logout -> logout.permitAll());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`
    },
    {
      filename: 'RestaurantController.java',
      code: `package com.fooddelivery.controller;

import com.fooddelivery.model.Restaurant;
import com.fooddelivery.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public String listRestaurants(@RequestParam(required = false) String search, Model model) {
        List<Restaurant> restaurants = (search != null && !search.isEmpty()) ?
                restaurantService.searchByNameOrCuisine(search) : restaurantService.getAllRestaurants();
        model.addAttribute("restaurants", restaurants);
        return "restaurants";
    }

    @GetMapping("/{id}")
    public String getRestaurantDetail(@PathVariable Long id, Model model) {
        Restaurant restaurant = restaurantService.getById(id);
        model.addAttribute("restaurant", restaurant);
        return "restaurant-detail";
    }
}`
    },
    {
      filename: 'Order.java (JPA Entity)',
      code: `package com.fooddelivery.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    private BigDecimal totalAmount;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status; // PLACED, PREPARING, OUT_FOR_DELIVERY, DELIVERED

    private String deliveryAddress;
    private String paymentMethod;
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    // Getters and Setters ...
}`
    },
    {
      filename: 'application.properties',
      code: `# MySQL Database Setup
spring.datasource.url=jdbc:mysql://localhost:3306/fooddelivery_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA & Hibernate Setup
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Thymeleaf Template Engine
spring.thymeleaf.cache=false
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html`
    }
  ];

  const MYSQL_SQL_DUMP = `-- MySQL Database Export: fooddelivery_db.sql
-- Generated for Data Alcott Systems Internship Task JV-EC-002

CREATE DATABASE IF NOT EXISTS fooddelivery_db;
USE fooddelivery_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('USER', 'RESTAURANT', 'ADMIN', 'DRIVER') DEFAULT 'USER',
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  rating DECIMAL(3,2) DEFAULT 4.5,
  cuisine VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  is_open BOOLEAN DEFAULT TRUE
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50),
  image VARCHAR(255),
  is_available BOOLEAN DEFAULT TRUE,
  is_vegetarian BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  restaurant_id BIGINT,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') DEFAULT 'PLACED',
  delivery_address TEXT,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- Sample Data Seeding
INSERT INTO restaurants (name, description, rating, cuisine, address, phone) VALUES 
('Spicy Tandoor India', 'Authentic Indian delicacies & biryanis', 4.8, 'Indian', '45 Spice Route Ave', '+15552345678'),
('Bella Italia Trattoria', 'Wood-fired pizza and fresh pasta', 4.9, 'Italian', '12 Via Roma Way', '+15558765432');
`;

  const README_MARKDOWN = `# Food Delivery Application (JV-EC-002)
## Data Alcott Systems - Free Java Full Stack Internship Online

### Project Overview
Full-stack food delivery web application built with Spring Boot, Hibernate, JPA, MySQL, and Thymeleaf for Data Alcott Systems task JV-EC-002.

- **Task ID:** JV-EC-002
- **Student Code:** DAS-JV-002
- **Domain:** E-Commerce Food Delivery
- **Task Link:** https://www.freeinternships.in/java-full-stack-internship/free-online-java-full-stack-internship-food-delivery-app-jv-ec-002.php

### Key Features
1. Spring Security Authentication (User, Restaurant, Driver, Admin)
2. Restaurant Listing & Search with Cuisine Filters
3. Menu Management & Interactive Cart
4. Order Processing & Real-time Delivery Tracking
5. Delivery Assignment & Driver Dashboard
6. Admin Analytics Dashboard
`;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-gradient-to-r from-neutral-900 via-amber-950 to-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-neutral-950 font-black flex items-center justify-center shadow-xs">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg">Internship Task Hub & Code Inspector</h3>
                <span className="bg-amber-400 text-neutral-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                  JV-EC-002
                </span>
              </div>
              <p className="text-xs text-amber-200/80">Data Alcott Systems · Free Java Full Stack Internship</p>
            </div>
          </div>

          <button
            onClick={() => setIsTaskPortalOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-5 text-xs font-bold gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'border-amber-600 text-amber-800 font-extrabold' : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Task Overview & Timeline
          </button>
          <button
            onClick={() => setActiveTab('java-code')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'java-code' ? 'border-amber-600 text-amber-800 font-extrabold' : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Spring Boot Code
          </button>
          <button
            onClick={() => setActiveTab('sql-schema')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sql-schema' ? 'border-amber-600 text-amber-800 font-extrabold' : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> MySQL Dump (.sql)
          </button>
          <button
            onClick={() => setActiveTab('submission')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'submission' ? 'border-amber-600 text-amber-800 font-extrabold' : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" /> Submission Checklist
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Tab 1: Task Overview & Timeline */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Task Metadata Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-xs">
                <div>
                  <div className="font-bold text-neutral-400 uppercase text-[10px]">Task ID</div>
                  <div className="font-extrabold text-neutral-900 text-sm">{INTERNSHIP_TASK_DATA.taskId}</div>
                </div>
                <div>
                  <div className="font-bold text-neutral-400 uppercase text-[10px]">Student Code</div>
                  <div className="font-extrabold text-neutral-900 text-sm">{INTERNSHIP_TASK_DATA.studentCode}</div>
                </div>
                <div>
                  <div className="font-bold text-neutral-400 uppercase text-[10px]">Domain</div>
                  <div className="font-extrabold text-neutral-900 text-sm">{INTERNSHIP_TASK_DATA.domain}</div>
                </div>
                <div>
                  <div className="font-bold text-neutral-400 uppercase text-[10px]">Company</div>
                  <div className="font-extrabold text-neutral-900 text-sm">{INTERNSHIP_TASK_DATA.company}</div>
                </div>
              </div>

              {/* 1-Week Timeline */}
              <div>
                <h4 className="font-extrabold text-sm text-neutral-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" /> 1-Week Implementation Roadmap
                </h4>
                <div className="space-y-2">
                  {INTERNSHIP_TASK_DATA.timeline.map((item) => (
                    <div key={item.day} className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-100 text-amber-900 font-black px-2.5 py-1 rounded-xl shrink-0">
                          {item.day}
                        </span>
                        <div>
                          <div className="font-bold text-neutral-900">{item.title}</div>
                          <div className="text-[10px] text-neutral-400">{item.hours} Hours Estimated</div>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Tables Overview */}
              <div>
                <h4 className="font-extrabold text-sm text-neutral-900 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-600" /> Relational Database Schema Tables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {INTERNSHIP_TASK_DATA.dbTables.map((tbl) => (
                    <div key={tbl.name} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200">
                      <div className="font-extrabold text-indigo-700">{tbl.name}</div>
                      <div className="text-[11px] text-neutral-500">{tbl.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Spring Boot Code Inspector */}
          {activeTab === 'java-code' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-500">Source File Explorer:</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">Spring Boot 3.x MVC Architecture</span>
              </div>

              <div className="space-y-4">
                {JAVA_FILES.map((file) => (
                  <div key={file.filename} className="rounded-2xl border border-neutral-800 overflow-hidden bg-slate-950 text-slate-100 font-mono text-xs">
                    <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-slate-400">
                      <div className="flex items-center gap-2 font-bold text-amber-400">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{file.filename}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(file.filename, file.code)}
                        className="hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === file.filename ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === file.filename ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed text-slate-300">
                      {file.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: MySQL SQL Dump */}
          {activeTab === 'sql-schema' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-500">Dump File: fooddelivery_db.sql</span>
                <button
                  onClick={() => handleCopy('sql', MYSQL_SQL_DUMP)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy SQL Dump
                </button>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-slate-950 text-emerald-400 font-mono text-xs p-4 overflow-x-auto leading-relaxed">
                <pre>{MYSQL_SQL_DUMP}</pre>
              </div>
            </div>
          )}

          {/* Tab 4: Submission Checklist & README */}
          {activeTab === 'submission' && (
            <div className="space-y-6">
              
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs space-y-2">
                <div className="font-extrabold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Submission Requirements Checklist
                </div>
                <ul className="list-disc list-inside space-y-1 font-medium">
                  <li>GitHub Repository: Public repo with source code & README.md</li>
                  <li>Database Export: MySQL dump file (fooddelivery_db.sql) with sample data</li>
                  <li>Project Report (2-3 pages): Architecture, tech stack & database design</li>
                  <li>YouTube Video Demonstration: Walkthrough of order flow & admin features</li>
                  <li>Blog Submission at freeinternships.in/blog/</li>
                </ul>
              </div>

              {/* README.md Preview */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-xs text-neutral-700 uppercase">Generated README.md for Repository</h4>
                  <button
                    onClick={() => handleCopy('readme', README_MARKDOWN)}
                    className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy README.md
                  </button>
                </div>
                <div className="p-4 bg-neutral-900 text-neutral-200 rounded-2xl font-mono text-xs overflow-x-auto">
                  <pre>{README_MARKDOWN}</pre>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
