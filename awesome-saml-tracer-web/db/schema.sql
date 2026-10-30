-- Feedback submissions from the extension + website.
-- Apply with:
--   npx wrangler d1 execute ast-feedback --remote --file=awesome-saml-tracer-web/db/schema.sql
CREATE TABLE IF NOT EXISTS feedback (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),  -- ISO-ish UTC timestamp
  version     TEXT,        -- extension build, from the ?v= tag (e.g. "1.1.3")
  source      TEXT,        -- "extension" | "site"
  use_case    TEXT,        -- "What do you use it for?"
  pain        TEXT,        -- "What's missing or frustrating?"
  recommend   TEXT,        -- "What would make you recommend it?"
  email       TEXT,        -- optional contact
  handled     INTEGER NOT NULL DEFAULT 0  -- triage flag (0 = new, 1 = dealt with)
);

CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
