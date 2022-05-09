import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { allActions } from "../reducers/all-actions";
import { useMemo } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();

// useMemo is used to avoid memory leak
// when action are put into the dependency array of useEffect hook
export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => {
    return bindActionCreators(allActions, dispatch);
  }, [dispatch]);
};
