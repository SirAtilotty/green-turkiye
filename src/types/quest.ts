export type QuestType = 'threshold' | 'accumulation' | 'counter';

export interface QuestReward {
    budget?: number;
    happiness?: number;
    cleanliness?: number;
}

export interface Quest {
    id: string;
    type: QuestType;
    title: string;
    description: string;
    reward: QuestReward;
    // Condition Config
    target?: number; // For threshold/accumulation/counter
    stat?: 'budget' | 'happiness' | 'cleanliness' | 'day'; // For threshold
    eventCount?: number; // For counter
}

export interface QuestState {
    id: string;
    progress: number;
    isCompleted: boolean;
    isClaimed: boolean; // Just in case we want claim logic later, for now auto-reward
}

export interface DailyQuestData {
    date: string; // "YYYY-MM-DD"
    quests: QuestState[];
}
