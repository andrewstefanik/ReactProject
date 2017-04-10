import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Image, Dimensions, TextInput } from 'react-native';
import Camera from 'react-native-camera';


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    camera: {
        position: "absolute",
        justifyContent: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: height * .35
    },
    image: {
        position: "absolute",
        justifyContent: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: height * .35
    },
    buttonBar: {
        flexDirection: "row",
        position: "absolute",
        bottom: 5,
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
    buttonTwo: {
            padding: 10,
            borderWidth: 1,
            borderColor: "#000",
            margin: 5
    },
    buttonText: {
        color: "#FFFFFF"
    },
    buttonTextTwo: {
        color: "#000"
    }
});

export default class Cam extends Component {
    state = {
        cameraType: Camera.constants.Type.back,
        captureTarget: Camera.constants.CaptureTarget.disk,
        flashMode: Camera.constants.FlashMode.auto,
        orientation: Camera.constants.Orientation.auto,
        pictureUri: null,
        path: null,
        latitude: null,
        longitude: null,
        error: null,
        // description: 'Description',
    }

    switchCamera = () => {
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    }

    takePicture = () => {
        if (this.camera) {
            navigator.geolocation.getCurrentPosition(location => {
                // console.log(location);
                this.camera.capture()
                .then((data) => {
                    console.log(data);
                    this.setState({
                        pictureUri: data.path,
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude
                    })
                })
                .catch(err => console.error(err));
            })
        }
    }

    flashMode = () => {
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

    render() {
        if (this.state.pictureUri) {
            return (
                <View style={styles.container}>
                    <Image style={styles.camera} source={{ uri: this.state.pictureUri }}/>
                    <Text>Longitude: {this.state.longitude} latitude: {this.state.latitude}</Text>
                    {/* <TextInput placeholder={"Description"}></TextInput> */}
                    <View style={styles.buttonBar}>
                        <TouchableHighlight style={styles.buttonTwo}>
                            <Text style={styles.buttonTextTwo}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonTwo}>
                            <Text style={styles.buttonTextTwo}>Save</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Camera
                        ref={(cam) =>{this.camera = cam;}}
                        style={styles.camera}
                        type={this.state.cameraType}
                        captureTarget = {this.state.captureTarget}
                        flashMode = {this.state.flashMode}>
                    </Camera>
                    <View style={styles.buttonBar}>
                        <TouchableHighlight style={styles.buttonTwo} onPress={this.switchCamera}>
                            <Text style={styles.buttonTextTwo}>Flip</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonTwo} onPress={this.takePicture}>
                            <Text style={styles.buttonTextTwo}>Take</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonTwo} onPress={this.flashMode}>
                            <Text style={styles.buttonTextTwo}>Flash</Text>
                        </TouchableHighlight>
                    </View>
            </View>
            );
        }
    }
}
