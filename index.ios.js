"use strict";

const React = require("react");
const ReactNative = require("react-native");
const {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View,
  AppRegistry
} = ReactNative;

const styles = StyleSheet.create({
  row: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 20,
    backgroundColor: "#3a5795",
    margin: 5
  },
  text: {
    alignSelf: "center",
    color: "#fff"
  },
  scrollview: {
    flex: 1
  }
});

class Row extends React.Component {
  _onClick = () => {
    this.props.onClick(this.props.data);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClick}>
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class RefreshControlIssue extends React.Component {
  static title = "<RefreshControl>";
  static description = "Adds pull-to-refresh support to a scrollview.";

  state = {
    isRefreshing: false,
    rowData: Array.from(new Array(2)).map((val, i) => ({
      text: "Refreshing " + i
    }))
  };

  _onClick = row => {
    if (row.text == "Refreshing 0") {
      this.setState({ isRefreshing: false });
    } else if (row.text == "Refreshing 1") {
      this.setState({ isRefreshing: true });
    }
  };

  render() {
    let refreshingBooleanText;
    if (this.state.isRefreshing == true) {
      refreshingBooleanText = "true";
    } else if (this.state.isRefreshing == false) {
      refreshingBooleanText = "false";
    }
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick} />;
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={["#ff0000", "#00ff00", "#0000ff"]}
            progressBackgroundColor="#ffff00"
          />
        }
      >
        {rows}
        <Text>isRefreshing: {refreshingBooleanText}</Text>
      </ScrollView>
    );
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 5000);
  };
}

AppRegistry.registerComponent("RefreshControlIssue", () => RefreshControlIssue);
