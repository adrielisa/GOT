import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Character {
    id: number;
    fullName: string;
    title: string;
    family: string;
    imageUrl: string;
}

interface CardProps {
    character: Character;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onPress: () => void;
}

export default function CharacterCard({
    character,
    isFavorite,
    onToggleFavorite,
    onPress,
}: CardProps) {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
            {/* Contenedor de Imagen */}
            <View style={styles.imageWrapper}>
                <Image source={{ uri: character.imageUrl }} style={styles.image} />

                {/* Botón Favorito */}
                <TouchableOpacity
                    style={styles.favBtn}
                    onPress={() => onToggleFavorite(character.id)}
                >
                    <Text style={styles.favIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>

                {/* Tag de la casa */}
                {character.family ? (
                    <View style={styles.houseBadge}>
                        <Text style={styles.houseText} numberOfLines={1}>
                            {character.family}
                        </Text>
                    </View>
                ) : null}
            </View>

            {/* Info inferior */}
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {character.fullName}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                    {character.title || 'Desconocido'}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.id}>#{character.id}</Text>
                    <Text style={styles.verLink}>Ver ❯</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#12151c',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1d222e',
        margin: 6,
    },
    imageWrapper: {
        width: '100%',
        height: 160,
        backgroundColor: '#0a0c10',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    favBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(15, 18, 24, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,          
        elevation: 5,       
    },
    favIcon: { fontSize: 13 },
    houseBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: 'rgba(15, 18, 24, 0.9)',
        borderWidth: 1,
        borderColor: '#d97706',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        maxWidth: '85%',
    },
    houseText: {
        color: '#fbbf24',
        fontSize: 10,
        fontWeight: '700',
    },
    info: {
        padding: 12,
    },
    name: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '800',
        fontFamily: 'serif',
        letterSpacing: 0.5,
    },
    title: {
        color: '#7e8799',
        fontSize: 11,
        fontStyle: 'italic',
        marginTop: 2,
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#1a1f2b',
        paddingTop: 8,
    },
    id: { color: '#4b5563', fontSize: 10, fontWeight: '700' },
    verLink: { color: '#e5b842', fontSize: 11, fontWeight: '700' },
});