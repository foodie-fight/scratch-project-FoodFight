
import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

const RadioBtns = () => (
    <div>
        <RadioButtonGroup name="foodTypes" defaultSelected="not_light">
            
        

            <RadioButton
                value={this.props.value}
                label={this.props.label}
                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={styles.radioButton}
            />
            
            
            <RadioButton
                value="Italian"
                label="Italian"
                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={styles.radioButton}
            />


            <RadioButton
                value="Chinese"
                label="Chinese"
                checkedIcon={<ActionFavorite style={{ color: '#F44336' }} />}
                uncheckedIcon={<ActionFavoriteBorder />}
                style={styles.radioButton}
            />
        </RadioButtonGroup>
       
    </div>
);

export default RadioBtns;
