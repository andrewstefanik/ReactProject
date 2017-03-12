import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Camera from 'react-native-camera';

var ReactProject = React.createClass({

    getInitialState() {
        return {
            cameraType: Camera.constants.Type.back,
            captureTarget: Camera.constants.CaptureTarget.disk,
            flashMode: Camera.constants.FlashMode.auto,
        }
    },

    render() {
        return (
            <Camera
                ref={(cam) =>{this.camera = cam;}}
                style={styles.container}
                type={this.state.cameraType}
                captureTarget = {this.state.captureTarget}
                flashMode = {this.state.flashMode}>
                <View style={styles.buttonBar}>
                    <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
                        <Text style={styles.buttonText}>Flip</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this._takePicture}>
                        <Text style={styles.buttonText}>Take</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this._flashMode}>
                        <Text style={styles.buttonText}>Flash</Text>
                    </TouchableHighlight>
                </View>
            </Camera>
        );
    },

    switchCamera() {
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    },

    takePicture() {
        if (this.camera) {
            this.camera.capture().then((data) => console.log(data)).catch(err => console.error(err));
        }
    },

    flashMode() {
        var state = this.state;

        if (state.flashMode === Camera.constants.FlashMode.auto) {
            state.flashMode = Camera.constants.FlashMode.on;
        } else if (state.flashMode === Camera.constants.FlashMode.on) {
            state.flashMode = Camera.constants.FlashMode.off;
        } else if (state.flashMode === Camera.constants.FlashMode.off) {
            state.flashMode = Camera.constants.FlashMode.auto;
        }
        this.setState(state);
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    buttonBar: {
        flexDirection: "row",
        position: "absolute",
        bottom: 25,
        right: 0,
        left: 0,
        justifyContent: "center"
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        margin: 5
    },
    buttonText: {
        color: "#FFFFFF"
    }
});

export default ReactProject;
