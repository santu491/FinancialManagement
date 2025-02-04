export interface Preference {
  id: string;
  category: PreferenceCategory[];
  type: string;
}

export interface PreferenceCategory {
  id: string;
  label: string;
}
