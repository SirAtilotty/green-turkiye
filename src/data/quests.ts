import type { Quest } from '../types/quest';

export const ALL_QUESTS: Quest[] = [
    {
        id: 'budget_master',
        type: 'threshold',
        title: 'Bütçe Uzmanı',
        description: 'Bütçeni 1000 Milyon TL üzerine çıkar.',
        stat: 'budget',
        target: 1000,
        reward: { happiness: 5 }
    },
    {
        id: 'happy_people',
        type: 'threshold',
        title: 'Mutlu Halk',
        description: 'Halk mutluluğunu %80 üzerine çıkar.',
        stat: 'happiness',
        target: 80,
        reward: { budget: 100 }
    },
    {
        id: 'clean_city',
        type: 'threshold',
        title: 'Tertemiz Şehir',
        description: 'Temizlik oranını %90 üzerine çıkar.',
        stat: 'cleanliness',
        target: 90,
        reward: { happiness: 10 }
    },
    {
        id: 'crisis_manager',
        type: 'counter',
        title: 'Kriz Yöneticisi',
        description: '3 adet olay çöz.',
        target: 3,
        reward: { budget: 150, happiness: 5 }
    },
    {
        id: 'survivor',
        type: 'threshold',
        title: 'Hayatta Kalan',
        description: '10. güne ulaş.',
        stat: 'day', // Special case handling in hook? Or just mapping
        target: 10, // Logic needs to map 'day' from game state
        reward: { cleanliness: 15 }
    }
];
