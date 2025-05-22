import { kv } from '@vercel/kv';
const SETTINGS_KEY = 'app_settings';
export interface AppSettings {
    registrationEnabled: boolean;
    maintenanceMode: boolean;
    apiRateLimit: number;
    passwordPolicy: 'low' | 'medium' | 'high';
    require2FA: boolean;
    activityLogging: boolean;
}
const defaultSettings: AppSettings = {
    registrationEnabled: true,
    maintenanceMode: false,
    apiRateLimit: 100,
    passwordPolicy: 'medium',
    require2FA: true,
    activityLogging: true,
};
export async function getSettings(): Promise<AppSettings> {
    try {
        const settings = await kv.get<AppSettings>(SETTINGS_KEY);
        return settings || defaultSettings;
    }
    catch (error) {
        console.error('Error getting settings:', error);
        return defaultSettings;
    }
}
export async function saveSettings(settings: Partial<AppSettings>): Promise<boolean> {
    try {
        const currentSettings = await getSettings();
        const mergedSettings = { ...currentSettings, ...settings };
        await kv.set(SETTINGS_KEY, mergedSettings);
        return true;
    }
    catch (error) {
        console.error('Error saving settings:', error);
        return false;
    }
}
