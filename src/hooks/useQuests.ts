import { useState, useEffect } from 'react';
import { ALL_QUESTS } from '../data/quests';
import type { QuestState } from '../types/quest';
import type { GameState } from '../types';

export function useQuests(gameState: GameState) {
    const [quests, setQuests] = useState<QuestState[]>([]);
    const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

    // Initialize active quests on game start
    useEffect(() => {
        if (gameState.isPlaying && quests.length === 0) {
            // Assign some starter quests
            const initialQuests: QuestState[] = ALL_QUESTS.filter(q => q.type === 'threshold').map(q => ({
                id: q.id,
                progress: 0,
                isCompleted: false,
                isClaimed: false
            }));
            setQuests(initialQuests);
        } else if (!gameState.isPlaying) {
            setQuests([]);
            setToast(null);
        }
    }, [gameState.isPlaying]);

    // Update quest progress based on game state
    useEffect(() => {
        if (!gameState.isPlaying || quests.length === 0) return;

        setQuests(prevQuests => {
            let isUpdated = false;
            const updatedQuests = prevQuests.map(qState => {
                if (qState.isCompleted) return qState;

                const qDef = ALL_QUESTS.find(q => q.id === qState.id);
                if (!qDef) return qState;

                let currentProgress = qState.progress;
                if (qDef.stat === 'budget') currentProgress = gameState.budget;
                else if (qDef.stat === 'happiness') currentProgress = gameState.happiness;
                else if (qDef.stat === 'cleanliness') currentProgress = gameState.cleanliness;
                else if (qDef.stat === 'day') currentProgress = gameState.day;

                const isCompleted = qDef.target !== undefined && currentProgress >= qDef.target;

                if (currentProgress !== qState.progress || isCompleted) {
                    isUpdated = true;
                    if (isCompleted && !qState.isCompleted) {
                        setToast({ message: `${qDef.title} Tamamlandı!`, visible: true });
                        setTimeout(() => setToast(null), 3000);
                    }
                    return { ...qState, progress: currentProgress, isCompleted };
                }
                return qState;
            });

            return isUpdated ? updatedQuests : prevQuests;
        });
    }, [gameState.budget, gameState.happiness, gameState.cleanliness, gameState.day, gameState.isPlaying]);

    return { quests, toast };
}
