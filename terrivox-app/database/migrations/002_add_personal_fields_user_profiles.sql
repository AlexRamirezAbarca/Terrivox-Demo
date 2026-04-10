-- Migración 002: Actualizar la tabla de user_profiles para aceptar campos extendidos
-- Fecha de creación: Fase 1 (Configuración de Roles Auditables)

ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS identification VARCHAR(50),
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS age INTEGER CHECK (age >= 18),
ADD COLUMN IF NOT EXISTS gender VARCHAR(50),
ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
