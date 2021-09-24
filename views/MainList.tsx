import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../data/store';
import { ISelectedUnit } from "../data/interfaces";
import RemoveIcon from '@mui/icons-material/Clear';
import { selectUnit, removeUnit } from "../data/listSlice";
import UpgradeService from "../services/UpgradeService";
import { Button, Chip, IconButton, Paper } from "@mui/material";
import { useRouter } from "next/router";
import EquipmentService from "../services/EquipmentService";
import RuleList from "./components/RuleList";

export function MainList({ onSelected }) {

  const list = useSelector((state: RootState) => state.list);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSelectUnit = (unit: ISelectedUnit) => {
    if (list.selectedUnitId !== unit.selectionId) {
      dispatch(selectUnit(unit.selectionId));
    }
    onSelected(unit);
  };

  const handleRemove = (unit: ISelectedUnit) => {
    dispatch(removeUnit(unit.selectionId));
  };

  return (
    <>
      <Button onClick={() => router.push("/cards")}>View Cards</Button>
      <ul>
        {
          // For each selected unit
          list.units.map((s: ISelectedUnit, index: number) => (
            <li key={index}
              onClick={() => handleSelectUnit(s)} >
              <Paper square elevation={1} style={{ backgroundColor: (list.selectedUnitId === s.selectionId ? "#D7E3EB" : null) }}>
                <div className="py-2 px-4 is-flex is-flex-grow-1 is-align-items-center">
                  <div className="is-flex-grow-1">
                    <p className="mb-1" style={{ fontWeight: 600 }}>{s.customName || s.name} {s.size > 1 ? `[${s.size}]` : ''}</p>
                    <div className="is-flex" style={{ fontSize: "14px", color: "#666" }}>
                      <p>Qua {s.quality}</p>
                      <p className="ml-2">Def {s.defense}</p>
                    </div>
                  </div>
                  <p className="mr-2">{UpgradeService.calculateUnitTotal(s)}pts</p>
                  <IconButton color="primary" onClick={(e) => { e.stopPropagation(); handleRemove(s); }}>
                    <RemoveIcon />
                  </IconButton>
                </div>
                <div className="pb-2 px-4" style={{ fontSize: "14px", color: "#666666" }}>
                  <div>
                    {s.selectedEquipment.filter(e => e.count > 0).map((eqp, i) => (
                      <span key={i}>
                        {i > 0 ? ", " : ""}{eqp.name}
                      </span>
                    ))}
                  </div>
                  <RuleList specialRules={s.specialRules} />
                </div>
              </Paper>
            </li>
          ))
        }
      </ul>
    </>
  );
}
