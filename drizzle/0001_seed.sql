INSERT INTO "products" ("id", "name", "item_page", "quantity", "currency", "min_price", "created_at", "updated_at") VALUES
('prod_001', 'Product 1', 'product1.com', 10, 'EUR', 9.99, NOW(), NOW()),
('prod_002', 'Product 2', 'product2.com', 15, 'EUR', 14.99, NOW(), NOW()),
('prod_003', 'Product 3', 'product3.com', 20, 'EUR', 19.99, NOW(), NOW()),
('prod_004', 'Product 4', 'product4.com', 5, 'EUR', 7.99, NOW(), NOW()),
('prod_005', 'Product 5', 'product5.com', 8, 'EUR', 12.99, NOW(), NOW()),
('prod_006', 'Product 6', 'product6.com', 12, 'EUR', 16.99, NOW(), NOW()),
('prod_007', 'Product 7', 'product7.com', 18, 'EUR', 21.99, NOW(), NOW()),
('prod_008', 'Product 8', 'product8.com', 3, 'EUR', 5.99, NOW(), NOW()),
('prod_009', 'Product 9', 'product9.com', 25, 'EUR', 24.99, NOW(), NOW()),
('prod_010', 'Product 10', 'product10.com', 7, 'EUR', 11.99, NOW(), NOW());

INSERT INTO "users" ("id", "username", "passwordHash", "balance", "created_at") VALUES
('user_001', 'john_doe', 'hashed_password_1', 100.00, NOW()),
('user_002', 'jane_smith', 'hashed_password_2', 50.00, NOW());
