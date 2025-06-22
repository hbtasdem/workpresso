
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ImageSourcePropType } from "react-native";

type BrewCardProps = {
    label: string;
    duration: string;
    image: ImageSourcePropType;
    onPress: () => void;
};

export default function BrewCard({label, duration, image, onPress} : BrewCardProps) {
    return(
        <TouchableOpacity style = {styles.card} onPress={onPress}>
            <View style = {styles.iconWrapper}>
                <Image source={image} style={styles.icon} resizeMode="contain" />
            </View>
            <View style = {{width: 16}} />
            <View style = {styles.textContainer}>
                <Text style = {styles.brewLabel}>{label}</Text>
                <Text style = {styles.brewTime}>{duration}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f4ef',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    width: '90%',
    maxWidth: 340,
    height: 100,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  iconWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  brewLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5d4636',
  },
  brewTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3e2723',
    marginTop: 4,
  },
});
