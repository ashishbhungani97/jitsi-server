/* @flow */
import React, { Component } from 'react';

import { translate } from '../../base/i18n/functions';
import Select from '../../base/ui/components/web/Select';

/**
 * The type of the React {@code Component} props of {@link DeviceSelector}.
 */
type Props = {

    /**
     * MediaDeviceInfos used for display in the select element.
     */
    devices: Array<Object>,

    /**
     * If false, will return a selector with no selection options.
     */
    hasPermission: boolean,

    /**
     * CSS class for the icon to the left of the dropdown trigger.
     */
    icon: string,

    /**
     * If true, will render the selector disabled with a default selection.
     */
    isDisabled: boolean,

    /**
     * The translation key to display as a menu label.
     */
    label: string,

    /**
     * The callback to invoke when a selection is made.
     */
    onSelect: Function,

    /**
     * The default device to display as selected.
     */
    selectedDeviceId: string,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function,

    /**
     * The id of the dropdown element.
     */
    id: string
};

/**
 * React component for selecting a device from a select element. Wraps
 * AKDropdownMenu with device selection specific logic.
 *
 * @augments Component
 */
class DeviceSelector extends Component<Props> {
    /**
     * Initializes a new DeviceSelector instance.
     *
     * @param {Object} props - The read-only React Component props with which
     * the new instance is to be initialized.
     */
    constructor(props) {
        super(props);

        this._onSelect = this._onSelect.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        if (this.props.hasPermission === undefined) {
            return null;
        }

        if (!this.props.hasPermission) {
            return this._renderNoPermission();
        }

        if (!this.props.devices || !this.props.devices.length) {
            return this._renderNoDevices();
        }

        const items = this.props.devices.map(device => {
            return {
                value: device.deviceId,
                label: device.label || device.deviceId
            };
        });
        const defaultSelected = this.props.devices.find(item =>
            item.deviceId === this.props.selectedDeviceId
        );

        return this._createDropdown({
            defaultSelected,
            isDisabled: this.props.isDisabled,
            items,
            placeholder: this.props.t('deviceSelection.selectADevice')
        });
    }

    /**
     * Creates a React Element for displaying the passed in text surrounded by
     * two icons. The left icon is the icon class passed in through props and
     * the right icon is AtlasKit ExpandIcon.
     *
     * @param {string} triggerText - The text to display within the element.
     * @private
     * @returns {ReactElement}
     */
    _createDropdownTrigger(triggerText) {
        return (
            <div className = 'device-selector-trigger'>
                <span className = 'device-selector-trigger-text'>
                    { triggerText }
                </span>
            </div>
        );
    }

    /**
     * Creates a AKDropdownMenu Component using passed in props and options. If
     * the dropdown needs to be disabled, then only the AKDropdownMenu trigger
     * element is returned to simulate a disabled state.
     *
     * @param {Object} options - Additional configuration for display.
     * @param {Object} options.defaultSelected - The option that should be set
     * as currently chosen.
     * @param {boolean} options.isDisabled - If true, only the AKDropdownMenu
     * trigger component will be returned to simulate a disabled dropdown.
     * @param {Array} options.items - All the selectable options to display.
     * @param {string} options.placeholder - The translation key to display when
     * no selection has been made.
     * @private
     * @returns {ReactElement}
     */
    _createDropdown(options) {
        const triggerText
            = (options.defaultSelected && (options.defaultSelected.label || options.defaultSelected.deviceId))
                || options.placeholder;
        const trigger = this._createDropdownTrigger(triggerText);

        if (options.isDisabled || !options.items.length) {
            return (
                <div className = 'device-selector-trigger-disabled'>
                    { trigger }
                </div>
            );
        }

        return (
            <div className = 'dropdown-menu'>
                <Select
                    onChange = { this._onSelect }
                    options = { options.items }
                    value = { this.props.selectedDeviceId } />
            </div>
        );
    }

    _onSelect: (Object) => void;

    /**
     * Invokes the passed in callback to notify of selection changes.
     *
     * @param {Object} e - The key event to handle.
     *
     * @private
     * @returns {void}
     */
    _onSelect(e) {
        const deviceId = e.target.value;

        if (this.props.selectedDeviceId !== deviceId) {
            this.props.onSelect(deviceId);
        }
    }

    /**
     * Creates a Select Component that is disabled and has a placeholder
     * indicating there are no devices to select.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderNoDevices() {
        return this._createDropdown({
            isDisabled: true,
            placeholder: this.props.t('settings.noDevice')
        });
    }

    /**
     * Creates a AKDropdownMenu Component that is disabled and has a placeholder
     * stating there is no permission to display the devices.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderNoPermission() {
        return this._createDropdown({
            isDisabled: true,
            placeholder: this.props.t('deviceSelection.noPermission')
        });
    }
}

export default translate(DeviceSelector);
