import { Checkbox, IconButton } from '@mui/material';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { IEquipment, ISelectedUnit, IUpgrade } from '../../../data/interfaces';
import { applyUpgrade, removeUpgrade } from '../../../data/listSlice';
import UpgradeService from '../../../services/UpgradeService';

export default function UpgradeUpDown({ selectedUnit, upgrade, option }: { selectedUnit: ISelectedUnit, upgrade: IUpgrade, option: IEquipment }) {

    const dispatch = useDispatch();

    const incrementUpgrade = (unit: ISelectedUnit, upgrade: IUpgrade, option: IEquipment) => {
        dispatch(applyUpgrade({ unitId: unit.selectionId, upgrade, option }));
    };
    const decrementUpgrade = (unit: ISelectedUnit, upgrade: IUpgrade, option: IEquipment) => {
        dispatch(removeUpgrade({ unitId: unit.selectionId, upgrade, option }));
    };

    const isApplied = UpgradeService.isApplied(selectedUnit, upgrade, option);
    const countApplied = UpgradeService.countApplied(selectedUnit, upgrade, option);
    const isValid = UpgradeService.isValid(selectedUnit, upgrade, option);

    // #endregion

    return (
        <>
            <IconButton
                disabled={countApplied === 0}
                color={countApplied > 0 ? "primary" : "default"}
                onClick={() => decrementUpgrade(selectedUnit, upgrade, option)}>

                <DownIcon />
            </IconButton>
            <div>{countApplied}</div>
            <IconButton
                disabled={!isValid}
                color={"primary"}
                onClick={() => incrementUpgrade(selectedUnit, upgrade, option)}
            >
                <UpIcon />
            </IconButton>
        </>
    );

    //return ({ upgrade.options.map((opt, i) => (<p></p>)});
}