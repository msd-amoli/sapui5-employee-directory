sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller, JSONModel, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("student.com.sap.training.advancedsapui5.employeedirectory.controller.Main", {
        onInit() {

            const oModel = new JSONModel();
            oModel.loadData("model/employees.json");
              oModel.attachRequestCompleted(() => {

                oModel.setProperty("/newEmployee", {
                    name: "",
                    department: "",
                    email: "",
                    salary: ""
                });

            });
            this.getView().setModel(oModel, "emp");
            console.log("hello")
          

        },
        onEmployeeSelect: function (evt) {
            console.log("event fired");
            const itm = evt.getParameter("listItem").getBindingContext("emp");//get the selected item row and its binding context
            const empobj = itm.getObject(); //get the object of the selected item

            const md = this.getView().getModel("emp");
            md.setProperty("/selectedEmployee", empobj);

            if (!this._oDialog) {
                this._oDialog = this.loadFragment({
                    name: "student.com.sap.training.advancedsapui5.employeedirectory.fragment.EmployeeDialog"
                });
            }
            this._oDialog.then((oDialog) => {
                oDialog.open();
            });


        },
        onCloseDialog: function () {
            this._oDialog.then((oDialog) => {
                oDialog.close();
            });
        },
        onDeleteEmployee: function () {

            const oModel = this.getView().getModel("emp");

            const aEmployees = oModel.getProperty("/employees");

            const oSelected = oModel.getProperty("/selectedEmployee");

            const iIndex = aEmployees.indexOf(oSelected);

            if (iIndex > -1) {
                aEmployees.splice(iIndex, 1);

                oModel.setProperty("/employees", aEmployees);

                oModel.setProperty("/selectedEmployee", null);
            }
        },




        onSearch: function (evt) {

            const sQuery = evt.getParameter("newValue");

            const oList = this.byId("emplist");
            const oBinding = oList.getBinding("items");

            if (!sQuery) {
                oBinding.filter([]);
                return;
            }

            const aFilters = [

                new Filter(
                    "name",
                    FilterOperator.Contains,
                    sQuery
                ),

                new Filter(
                    "department",
                    FilterOperator.Contains,
                    sQuery
                ),

                new Filter(
                    "email",
                    FilterOperator.Contains,
                    sQuery
                )

            ];

            const oCombinedFilter =
                new Filter({
                    filters: aFilters,
                    and: false
                });

            oBinding.filter(oCombinedFilter);

        },
        onSearch2: function (evt) {
            const qry = evt.getParameter("newValue");
            const lst = this.byId("emplist");
            const binding = lst.getBinding("items");
            if (!qry) {
                binding.filter([]);
                return;
            }
            const ofilter = new Filter("department", FilterOperator.Contains, qry);
            binding.filter([ofilter]);
        },
        onSort: function (evt) {
            const lst = this.byId("emplist");
            const binding = lst.getBinding("items");
            const v = evt.getSource().getSelectedKey();
            console.log(v);
            const oSorter = new Sorter(v, false);
            binding.sort(oSorter);
        },

        onAddEmployee: function () {
            const oModel = this.getView().getModel("emp");
            const aemp = oModel.getProperty("/employees");
            const newemp = oModel.getProperty("/newEmployee");
            console.log(newemp);
            aemp.push({
                id: Date.now(),
                name: newemp.name,
                department: newemp.department,
                email: newemp.email,
                salary: newemp.salary
            });
            oModel.setProperty("/employees", aemp);
        }
    });
});