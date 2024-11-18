-- Crear la base de datos
CREATE DATABASE ServiceWorldTour;
GO

USE ServiceWorldTour;
GO

-- Tabla de Leads/Reservas
CREATE TABLE Leads (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    telefono NVARCHAR(20) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    empresa NVARCHAR(100),
    origen NVARCHAR(200) NOT NULL,
    destino NVARCHAR(200) NOT NULL,
    fecha DATE NOT NULL,
    hora NVARCHAR(5) NOT NULL,
    pasajeros INT NOT NULL,
    tipoVehiculo NVARCHAR(50) NOT NULL,
    tipoServicio NVARCHAR(50) NOT NULL,
    esperaEnDestino BIT NOT NULL,
    requisitos NVARCHAR(MAX),
    etapa NVARCHAR(50) NOT NULL,
    fechaCreacion DATETIME DEFAULT GETDATE(),
    fechaActualizacion DATETIME DEFAULT GETDATE(),
    costo DECIMAL(18, 2) NULL DEFAULT 0,
    precioVenta DECIMAL(18, 2) NULL DEFAULT 0,
);
GO

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(100) NOT NULL,
    nombre NVARCHAR(100) NOT NULL,
    rol NVARCHAR(20) NOT NULL,
    fechaCreacion DATETIME DEFAULT GETDATE(),
);
GO

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (debe ser cambiada en producción)
INSERT INTO Usuarios (usuario, password, nombre, rol)
VALUES ('admin', '$2a$08$YLjrZn8eLmE6hqQwn9JZa.l.qtVy8kYCk7zeNwuRBsX1ENzxqGo6O', 'Administrador', 'admin');
GO

-- Índices
CREATE INDEX IX_Leads_Etapa ON Leads(etapa);
CREATE INDEX IX_Leads_Fecha ON Leads(fecha);
GO

-- Trigger para actualizar fechaActualizacion
CREATE TRIGGER TR_Leads_Update
ON Leads
AFTER UPDATE
AS
BEGIN
    UPDATE Leads
    SET fechaActualizacion = GETDATE()
    FROM Leads l
    INNER JOIN inserted i ON l.id = i.id
END
GO


-- Agregar la columna 'costo' a la tabla Leads
ALTER TABLE Leads
ADD costo DECIMAL(18, 2) NULL DEFAULT 0;

-- Agregar la columna 'precioVenta' a la tabla Leads
ALTER TABLE Leads
ADD precioVenta DECIMAL(18, 2) NULL DEFAULT 0;

-- Actualizar el campo 'fechaActualizacion' para reflejar el cambio en la estructura
UPDATE Leads
SET fechaActualizacion = GETDATE();
