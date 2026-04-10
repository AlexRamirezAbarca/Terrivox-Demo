-- Esquema Arquitectónico SQL para Terrivox (Fase 1: Manejo de Excel y Roles)
-- UUID Module
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Empresas (La base del ERP Multi-tenant)
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.5. Perfiles de Usuario y Roles (Mapeado a auth.users de Supabase)
CREATE TYPE app_role AS ENUM ('admin', 'supervisor', 'usuario');

CREATE TABLE IF NOT EXISTS user_profiles (
    -- El ID viene directamente del sistema de login (JWT) provisto por Supabase
    id UUID PRIMARY KEY,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    
    -- Campos Personales de Identificación
    identification VARCHAR(50),      -- Cédula / Identificación
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    age INTEGER CHECK (age >= 18),   -- Validación de mayoría de edad por capa de base de datos
    gender VARCHAR(50),
    phone VARCHAR(50),
    
    role app_role DEFAULT 'usuario',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Planes de Manejo (El contenedor maestro del Excel)
CREATE TABLE IF NOT EXISTS management_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- Ej: "Plan de Manejo Ambiental 2026"
    year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Medidas Ambientales (Extraído fila por fila del Excel)
CREATE TABLE IF NOT EXISTS environmental_measures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID REFERENCES management_plans(id) ON DELETE CASCADE,
    
    -- Columnas nativas extraídas de tu Excel
    item_number VARCHAR(50), 
    environmental_aspect TEXT NOT NULL, 
    measure_description TEXT NOT NULL, 
    finding_justification TEXT, 
    
    -- Calificación estandarizada (C, NC, NC+, NA)
    qualification VARCHAR(10), 
    
    verification_means TEXT, 
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creamos una empresa demo
INSERT INTO companies (name) VALUES ('Empresa Demo S.A.');
