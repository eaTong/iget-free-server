/**
 * created by eaTong at 2019/10/12
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, List, Popover} from "antd";
import {bookMarkStatus} from "../../bothSide/enums";

const ListItem = List.Item;

class PopoverSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired
  };
  static defaultProps = {};
  state = {
    showPopover: false
  };

  onSelect(item) {
    this.setState({showPopover: false});
    this.props.onChange && this.props.onChange(item.value, item);
  }

  render() {
    const {showPopover} = this.state;
    const {value, options} = this.props;
    return (
      <Popover
        trigger={'click'}
        visible={showPopover}
        onVisibleChange={visible => this.setState({showPopover: visible})}
        content={(
          <List size={"small"} className={'popover-select'}>
            {(options || []).map(item => {
              const selected = String(item.value) === String(value);
              return (
                <ListItem
                  key={String(item.value)}
                  className={`popover-select-item ${selected ? 'active' : ''} `}
                  onClick={selected ? null : () => this.onSelect(item)}
                >
                  {item.label}
                </ListItem>
              )
            })}
          </List>)
        }
      >
        {this.props.children}
      </Popover>
    )
  }
}

export default PopoverSelect;
