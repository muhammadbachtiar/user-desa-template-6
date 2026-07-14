export interface DynamicSectionConfig {
    id: string;
    title: string;
    slug: string;
    order: number;
    enabled: boolean;
}

export interface DynamicSectionsSettingValue {
    sections: DynamicSectionConfig[];
}

export interface DynamicSectionData {
    config: DynamicSectionConfig;
    content: string;
}
