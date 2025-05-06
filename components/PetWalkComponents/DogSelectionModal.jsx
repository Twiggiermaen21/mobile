import React from 'react';
import { Modal, FlatList, TouchableWithoutFeedback, View, Text, Pressable, TouchableOpacity, RefreshControl } from 'react-native';
import styles from '@/assets/styles/map.styles';
import texture from '@/constants/colorsApp'
import IndexText from "@/assets/lang/Index.text";
import { useSettingsStore } from '@/store/settingStore';

export default function DogSelectionModal({ isDogModalVisible, setIsDogModalVisible, dogsFromDB, selectedDogIds, setSelectedDogIds, refreshing, handleRefresh, startTracking, setDog }) {

    const { lang, color } = useSettingsStore();
    const t = IndexText[lang];
    const COLORS = texture[color];
    const dynamicStyles = styles(COLORS);
    return (
        <Modal
            visible={isDogModalVisible}
            animationType="slide"
            transparent={true}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    if (selectedDogIds.length !== null) {
                        setIsDogModalVisible(false);
                    }
                }}
            >
                <View style={dynamicStyles.ModalAroundBox}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={dynamicStyles.ModalBox}>
                            <Text style={dynamicStyles.title}>{t.selectDog}</Text>
                            <FlatList
                                data={dogsFromDB}
                                keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={handleRefresh}
                                        colors={[COLORS.primary]}
                                    />
                                }
                                renderItem={({ item }) => {
                                    const isSelected = selectedDogIds.includes(item._id);

                                    return (
                                        <Pressable
                                            style={[
                                                dynamicStyles.pressableDogs,
                                                { backgroundColor: isSelected ? '#d0f0d0' : '#f0f0f0' }
                                            ]}
                                            onPress={() => {
                                                setSelectedDogIds(prevSelected => {
                                                    const isSelected = prevSelected.includes(item._id);
                                                    const updatedSelection = isSelected
                                                        ? prevSelected.filter(id => id !== item._id)
                                                        : [...prevSelected, item._id];

                                                    return updatedSelection;
                                                });
                                            }}
                                        >
                                            <Text style={[dynamicStyles.info, { fontSize: 16 }]}>{item.name}</Text>
                                            <Text style={{ fontSize: 18, color: isSelected ? 'green' : '#ccc' }}>
                                                {isSelected ? '✓' : '○'}
                                            </Text>
                                        </Pressable>
                                    );
                                }}
                            />

                            <View style={dynamicStyles.buttonDone}>
                                <TouchableOpacity
                                    onPress={async () => {
                                        if (!(selectedDogIds?.length > 0)) {
                                            return;
                                        }
                                        const selectedDogs = dogsFromDB.filter(d => selectedDogIds.includes(d.id));
                                        setDog(selectedDogs);
                                        setIsDogModalVisible(false);
                                        await startTracking();
                                    }}
                                    style={[
                                        dynamicStyles.button,
                                        !(selectedDogIds?.length > 0) && dynamicStyles.buttonDisabled
                                    ]}
                                    disabled={!(selectedDogIds?.length > 0)}
                                >
                                    <Text style={dynamicStyles.buttonText}>{t.done}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

