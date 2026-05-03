ALTER TABLE public.media_items ADD COLUMN IF NOT EXISTS slot TEXT;
CREATE INDEX IF NOT EXISTS idx_media_items_section_slot ON public.media_items(section, slot);
CREATE UNIQUE INDEX IF NOT EXISTS idx_media_items_slot_unique ON public.media_items(slot) WHERE slot IS NOT NULL;