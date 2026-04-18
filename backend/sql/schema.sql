CREATE DATABASE IF NOT EXISTS logistics_db;
USE logistics_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'dispatcher', 'driver', 'warehouse', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drivers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  status ENUM('available', 'assigned', 'offline') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_driver_status (status)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(120) NOT NULL,
  receiver VARCHAR(120) NOT NULL,
  address VARCHAR(255) NOT NULL,
  status ENUM('Pending', 'Packed', 'Shipped', 'Out for delivery', 'Delivered') DEFAULT 'Pending',
  tracking_id VARCHAR(80) NOT NULL UNIQUE,
  driver_id INT NULL,
  created_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tracking_id (tracking_id),
  INDEX idx_order_status (status),
  INDEX idx_driver_id (driver_id),
  CONSTRAINT fk_orders_driver FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL,
  CONSTRAINT fk_orders_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tracking_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  status ENUM('Pending', 'Packed', 'Shipped', 'Out for delivery', 'Delivered') NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tracking_order (order_id),
  INDEX idx_tracking_time (timestamp),
  CONSTRAINT fk_tracking_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS warehouse (
  id INT AUTO_INCREMENT PRIMARY KEY,
  parcel_id VARCHAR(80) NOT NULL,
  location VARCHAR(120) NOT NULL,
  status ENUM('Stored', 'Ready for dispatch', 'Dispatched') DEFAULT 'Stored',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_parcel_id (parcel_id),
  INDEX idx_warehouse_location (location)
);
