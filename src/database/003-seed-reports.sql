-- Seed 100 demo reports (ids 2-101) plus an initial report_status_history entry each.
-- Re-runnable only on an empty/known state; running again appends another 100 rows.
-- Statuses follow src/api/swagger.yaml: pendente, em_andamento, resolvido, encerrado.

WITH params AS (
  SELECT
    ARRAY[
      'Ana Silva','Beatriz Souza','Camila Oliveira','Daniela Lima','Elaine Costa',
      'Fernanda Rocha','Gabriela Alves','Helena Martins','Isabela Ferreira','Juliana Ribeiro',
      'Karina Gomes','Larissa Dias','Mariana Barbosa','Natalia Cardoso','Patricia Moreira',
      'Renata Nunes','Sabrina Teixeira','Vanessa Lopes','Amanda Pinto','Bruna Castro'
    ]::text[] AS names,
    ARRAY[
      'Assedio verbal no transporte publico',
      'Aproximadamente tres homens me seguiram por duas quadras',
      'Comentarios invasivos durante o trajeto para a faculdade',
      'Contato fisico indesejado em local movimentado',
      'Exibicao indecente nas proximidades do terminal',
      'Perseguicao por motociclista apos sair do trabalho',
      'Assedio em aplicativo de transporte',
      'Comportamento suspeito de individuo proximo a estacao',
      'Ofensas de cunho sexual em via publica',
      'Empurroes e contato indevido no onibus lotado'
    ]::text[] AS details,
    ARRAY['pendente','em_andamento','resolvido','encerrado']::text[] AS statuses
),
computed AS (
  SELECT
    g.i,
    1 AS user_id,
    CASE WHEN g.i % 3 = 0 THEN NULL ELSE p.names[1 + (g.i % 20)] END AS name,
    round((-23.55 + (random() - 0.5) * 0.08)::numeric, 6)::float8 AS latitude,
    round((-46.63 + (random() - 0.5) * 0.08)::numeric, 6)::float8 AS longitude,
    p.details[1 + (g.i % 10)] || ' - registro ' || g.i AS details,
    p.statuses[1 + (g.i % 4)] AS status,
    (g.i % 3 = 0) AS is_anonymous,
    now() - (random() * interval '14 days') AS created_at
  FROM generate_series(1, 100) AS g(i)
  CROSS JOIN params p
),
ins AS (
  INSERT INTO public.reports (user_id, name, image_url, latitude, longitude, details, status, is_anonymous, created_at)
  SELECT user_id, name, NULL, latitude, longitude, details, status, is_anonymous, created_at
  FROM computed
  RETURNING id, status, created_at
)
INSERT INTO public.report_status_history (report_id, status, changed_by, changed_at)
SELECT id, status, NULL, created_at FROM ins;