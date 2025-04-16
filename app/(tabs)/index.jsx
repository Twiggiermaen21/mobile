import React, { Component, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, KeyboardAvoidingView, Image } from 'react-native';
import MapView, { Region, Polyline, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '@/assets/styles/map.styles'
import { API_URL } from "../../constants/api"
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
export default function index() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
            <View style={styles.container}>

                {/* Środkowa karta z mapą */}
                <View style={[styles.mapCard, { flex: 1, padding: 0, overflow: 'hidden' }]}>
                    <MapView
                        style={styles.map}
                        // region=""
                        showsUserLocation={true}
                        followsUserLocation={true}
                    >
                        {/* {this.state.path.length > 1 && (
                            <Polyline
                                coordinates={this.state.path}
                                strokeColor="#1E90FF"
                                strokeWidth={4}
                            />
                        )} */}
                    </MapView>
                </View>

                {/* Górna karta z informacjami */}
                <View style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Time</Text>
                            <Text style={styles.info}>
                                {/* {this.getTimeElapsed()} */}
                            </Text>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Speed</Text>
                            <Text style={styles.info}>
                                {/* {this.state.speed.toFixed(2)} km/h */}
                            </Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Distance</Text>
                            <Text style={styles.info}>
                                {/* {this.state.distance.toFixed(2)} km */}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Image style={styles.img} source={require("../../assets/ImagesPetWalk/dogimg.jpg")} />

                        {/* {!this.state.isTracking ? ( */}
                        <TouchableOpacity style={styles.button}
                        // onPress={this.startTracking}
                        >
                            <Text style={styles.buttonText}>▶️ Start Tracking</Text>
                        </TouchableOpacity>
                        {/* ) : (
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.button} onPress={this.pauseTracking}>
                                    <Text style={styles.buttonText}>⏸ Pauza</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={this.stopTracking}>
                                    <Text style={styles.buttonText}>⏹ Koniec</Text>
                                </TouchableOpacity>
                            </View>
                        )} */}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}