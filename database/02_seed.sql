-- ============================================================
-- TaskForge - Seed Data v1.0
-- Jalankan SETELAH 01_schema.sql
-- ============================================================

-- Password untuk semua demo user: "password123"
-- Hash bcrypt dari "password123" (cost 12)
-- Generate fresh di: https://bcrypt-generator.com/ cost 12

DO $$
DECLARE
    v_owner_id      UUID := uuid_generate_v4();
    v_pm_id         UUID := uuid_generate_v4();
    v_tech_id       UUID := uuid_generate_v4();
    v_dev_id        UUID := uuid_generate_v4();
    v_designer_id   UUID := uuid_generate_v4();
    v_ws_id         UUID := uuid_generate_v4();
    v_proj1_id      UUID := uuid_generate_v4();
    v_proj2_id      UUID := uuid_generate_v4();
    v_board1_id     UUID := uuid_generate_v4();
    v_board2_id     UUID := uuid_generate_v4();
    v_col_todo      UUID := uuid_generate_v4();
    v_col_inprog    UUID := uuid_generate_v4();
    v_col_review    UUID := uuid_generate_v4();
    v_col_done      UUID := uuid_generate_v4();
    v_col_todo2     UUID := uuid_generate_v4();
    v_col_inprog2   UUID := uuid_generate_v4();
    v_col_review2   UUID := uuid_generate_v4();
    v_col_done2     UUID := uuid_generate_v4();
    v_task1         UUID := uuid_generate_v4();
    v_task2         UUID := uuid_generate_v4();
    v_task3         UUID := uuid_generate_v4();
    v_task4         UUID := uuid_generate_v4();
    v_task5         UUID := uuid_generate_v4();
    v_task6         UUID := uuid_generate_v4();
    v_task7         UUID := uuid_generate_v4();
    v_task8         UUID := uuid_generate_v4();
    v_label1        UUID := uuid_generate_v4();
    v_label2        UUID := uuid_generate_v4();
    v_label3        UUID := uuid_generate_v4();
BEGIN

-- ============================================================
-- USERS
-- Password: password123
-- Note: Replace hash below with fresh bcrypt hash
-- ============================================================
INSERT INTO users (id, email, password_hash, full_name, avatar_url) VALUES
(v_owner_id,    'dino@taskforge.com',   '$2a$12$LGBji4.V2LuJHdRkq4OdS.QjCtUzRkx5xLYRCG72KmZQkbqYyvixG', 'Dino Prasetya',   'https://api.dicebear.com/7.x/avataaars/svg?seed=Dino'),
(v_pm_id,       'budi@taskforge.com',   '$2a$12$LGBji4.V2LuJHdRkq4OdS.QjCtUzRkx5xLYRCG72KmZQkbqYyvixG', 'Budi Santoso',    'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi'),
(v_tech_id,     'rina@taskforge.com',   '$2a$12$LGBji4.V2LuJHdRkq4OdS.QjCtUzRkx5xLYRCG72KmZQkbqYyvixG', 'Rina Fieldwork',  'https://api.dicebear.com/7.x/avataaars/svg?seed=Rina'),
(v_dev_id,      'ahmad@taskforge.com',  '$2a$12$LGBji4.V2LuJHdRkq4OdS.QjCtUzRkx5xLYRCG72KmZQkbqYyvixG', 'Ahmad Fauzi',     'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad'),
(v_designer_id, 'siti@taskforge.com',   '$2a$12$LGBji4.V2LuJHdRkq4OdS.QjCtUzRkx5xLYRCG72KmZQkbqYyvixG', 'Siti Rahayu',     'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti');

-- ============================================================
-- WORKSPACE
-- ============================================================
INSERT INTO workspaces (id, name, slug, description, owner_id) VALUES
(v_ws_id, 'ShieldSafe Corp', 'shieldsafe-corp', 'Workspace utama untuk proyek ShieldSafe dan Quantum', v_owner_id);

-- ============================================================
-- WORKSPACE MEMBERS
-- ============================================================
INSERT INTO workspace_members (workspace_id, user_id, role) VALUES
(v_ws_id, v_owner_id,    'Owner'),
(v_ws_id, v_pm_id,       'Admin'),
(v_ws_id, v_tech_id,     'Member'),
(v_ws_id, v_dev_id,      'Member'),
(v_ws_id, v_designer_id, 'Member');

-- ============================================================
-- PROJECTS
-- ============================================================
INSERT INTO projects (id, workspace_id, name, description, status, start_date, due_date, leader_id, created_by) VALUES
(v_proj1_id, v_ws_id, 'ShieldSafe', 
 'Mengembangkan situs promosi asuransi keselamatan kerja dengan kalkulator risiko real-time, responsif, dan premium.',
 'Active', '2023-08-01', '2023-08-30', v_pm_id, v_pm_id),
(v_proj2_id, v_ws_id, 'Quantum', 
 'Platform analitik data industri berbasis AI dengan dashboard real-time dan laporan otomatis.',
 'Active', '2023-09-01', '2023-10-15', v_pm_id, v_pm_id);

-- ============================================================
-- BOARDS
-- ============================================================
INSERT INTO boards (id, project_id, name) VALUES
(v_board1_id, v_proj1_id, 'ShieldSafe Main Board'),
(v_board2_id, v_proj2_id, 'Quantum Main Board');

-- ============================================================
-- COLUMNS - Project 1 (ShieldSafe)
-- ============================================================
INSERT INTO board_columns (id, board_id, name, order_index, color, is_default) VALUES
(v_col_todo,   v_board1_id, 'To Do',          0, '#a1a1aa', TRUE),
(v_col_inprog, v_board1_id, 'In Progress',    1, '#3b82f6', FALSE),
(v_col_review, v_board1_id, 'Client Review',  2, '#f59e0b', FALSE),
(v_col_done,   v_board1_id, 'Done',           3, '#10b981', FALSE);

-- COLUMNS - Project 2 (Quantum)
INSERT INTO board_columns (id, board_id, name, order_index, color, is_default) VALUES
(v_col_todo2,   v_board2_id, 'To Do',         0, '#a1a1aa', TRUE),
(v_col_inprog2, v_board2_id, 'In Progress',   1, '#3b82f6', FALSE),
(v_col_review2, v_board2_id, 'Client Review', 2, '#f59e0b', FALSE),
(v_col_done2,   v_board2_id, 'Done',          3, '#10b981', FALSE);

-- ============================================================
-- LABELS
-- ============================================================
INSERT INTO labels (id, workspace_id, name, color) VALUES
(v_label1, v_ws_id, 'Frontend',  '#6366f1'),
(v_label2, v_ws_id, 'Backend',   '#10b981'),
(v_label3, v_ws_id, 'Design',    '#8b5cf6');

-- ============================================================
-- TASKS - ShieldSafe
-- ============================================================
INSERT INTO tasks (id, column_id, title, description, priority, assignee_id, created_by, due_date, order_index) VALUES
-- DONE column
(v_task1, v_col_done, 'UX Research & User Flow', 
 'Riset pengguna, buat user persona, user stories, dan wireframe awal.',
 'High', v_designer_id, v_pm_id, '2023-08-05 17:00:00+07', 0),
(v_task2, v_col_done, 'Color Palette & Typography System', 
 'Tentukan warna brand, font system (Plus Jakarta Sans), dan spacing token.',
 'Medium', v_designer_id, v_pm_id, '2023-08-07 17:00:00+07', 1),
(v_task3, v_col_done, 'Component Library Setup',
 'Setup design tokens dan base components di Figma.',
 'Medium', v_designer_id, v_pm_id, '2023-08-09 17:00:00+07', 2),

-- IN PROGRESS column
(v_task4, v_col_inprog, 'Build Auth UI (Login & Register)',
 'Implementasi halaman login dan register dengan validasi form, dark mode, dan 2-panel layout premium.',
 'High', v_dev_id, v_pm_id, '2023-08-15 17:00:00+07', 0),
(v_task5, v_col_inprog, 'Implement SignalR Hub',
 'Setup SignalR hub di backend untuk broadcast task update real-time ke semua member workspace.',
 'Urgent', v_dev_id, v_pm_id, '2023-08-14 17:00:00+07', 1),

-- REVIEW column
(v_task6, v_col_review, 'Landing Page Final Mockup',
 'Final high-fidelity mockup landing page untuk client review dan approval sebelum development.',
 'High', v_designer_id, v_pm_id, '2023-08-12 17:00:00+07', 0),

-- TODO column
(v_task7, v_col_todo, 'Setup Supabase Schema & Migrations',
 'Buat semua tabel database di Supabase PostgreSQL sesuai schema final yang sudah diapprove.',
 'High', v_dev_id, v_pm_id, '2023-08-20 17:00:00+07', 0),
(v_task8, v_col_todo, 'Frontend Kanban Drag & Drop',
 'Implementasi fitur drag & drop task antar kolom di web dashboard dengan update real-time via SignalR.',
 'Medium', v_dev_id, v_pm_id, '2023-08-25 17:00:00+07', 1);

-- Task labels
INSERT INTO task_labels (task_id, label_id) VALUES
(v_task1, v_label3),
(v_task2, v_label3),
(v_task3, v_label3),
(v_task4, v_label1),
(v_task5, v_label2),
(v_task6, v_label3),
(v_task7, v_label2),
(v_task8, v_label1);

-- ============================================================
-- SAMPLE COMMENTS
-- ============================================================
INSERT INTO comments (task_id, user_id, content) VALUES
(v_task4, v_pm_id,   'Pastikan dark mode toggle bekerja dengan smooth transition 300ms ya'),
(v_task4, v_dev_id,  'Sudah implement dark mode class-based, tinggal cek di Firefox'),
(v_task5, v_dev_id,  'Hub sudah konek, sedang test broadcast ke multiple client'),
(v_task5, v_pm_id,   'Bagus! Test juga di mobile Flutter ya, pastikan reconnect logic jalan');

-- ============================================================
-- SAMPLE NOTIFICATIONS
-- ============================================================
INSERT INTO notifications (user_id, type, title, message, entity_id, entity_type) VALUES
(v_dev_id,  'TaskAssigned', 'Task Baru Diterima', 
 'Budi Santoso assign task "Build Auth UI (Login & Register)" ke kamu', v_task4, 'task'),
(v_dev_id,  'TaskAssigned', 'Task Baru Diterima',
 'Budi Santoso assign task "Implement SignalR Hub" ke kamu', v_task5, 'task'),
(v_designer_id, 'TaskAssigned', 'Task Baru Diterima',
 'Budi Santoso assign task "Landing Page Final Mockup" ke kamu', v_task6, 'task'),
(v_pm_id,   'TaskCommented', 'Komentar Baru',
 'Ahmad Fauzi berkomentar di "Implement SignalR Hub"', v_task5, 'task');

END $$;

-- Verifikasi data
SELECT 'users' as tabel, COUNT(*) FROM users UNION ALL
SELECT 'workspaces', COUNT(*) FROM workspaces UNION ALL
SELECT 'workspace_members', COUNT(*) FROM workspace_members UNION ALL
SELECT 'projects', COUNT(*) FROM projects UNION ALL
SELECT 'board_columns', COUNT(*) FROM board_columns UNION ALL
SELECT 'tasks', COUNT(*) FROM tasks UNION ALL
SELECT 'comments', COUNT(*) FROM comments UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications;
