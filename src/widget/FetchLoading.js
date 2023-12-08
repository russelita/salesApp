import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FontSize } from '../utility'

const FetchLoading = ({ visible }) => {
    return (
        <Modal transparent={true}
            visible={visible}>
            <View style={{ padding: 20, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={COLORS.primary} />
                <View style={{ height: 10 }} />
                <Text style={{ color: COLORS.white, fontSize: FontSize.font12 }}>Tunggu Sebentar...</Text>
            </View>
        </Modal>
    )
}

export default FetchLoading

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
})