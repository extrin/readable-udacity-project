import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Categories from './Categories';

class CustomAppBar extends React.Component {
  state = { drawerOpen: false };

  handleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    return (
      <div className="custom-app-bar">
        <AppBar
          title="Readable"
          showMenuIconButton={true}
          onLeftIconButtonClick={() => this.handleDrawer()}
          style={{ position: 'fixed' }}
        />
        <Drawer
          children={<Categories />}
          open={this.state.drawerOpen}
          onRequestChange={drawerOpen => this.setState({ drawerOpen })}
          docked={false}
          width={200}
        />
      </div>
    );
  }
}

export default CustomAppBar;
