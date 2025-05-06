import * as TaskManager from 'expo-task-manager';
import { Location } from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const defineLocationTask = () => {
    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
            console.error("Błąd w tasku śledzenia:", error);
            return;
        }

        if (data) {
            const { locations } = data;
            const loc = locations[0];

            if (loc) {
                const { latitude, longitude, speed } = loc.coords;
                const newLoc = { latitude, longitude };

                console.log(loc.coords);
                // Możesz teraz zapisać do AsyncStorage lub wykonać inne operacje
            }
        }
    });
};

export { defineLocationTask, LOCATION_TASK_NAME };
