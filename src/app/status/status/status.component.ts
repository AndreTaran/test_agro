import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Vehicle, VehicleCode } from '../../shared/interface'
import json from '../../../assets/data.json'

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(json);
  displayedColumns: string[] = ['Vehicle.name', 'Vehicle.Organization.name', 'Vehicle.Department.name', 'Vehicle.Contragent.name', 'code1c', 'Aggregate', 'Drivers'];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterSelectObj = [];

  constructor() {
    this.filterSelectObj = [
      {
        name: 'Organization',
        columnProp: 'Organization',
        options: []
      },
      {
        name: 'Department',
        columnProp: 'Department',
        options: []
      },
      {
        name: 'Contragent',
        columnProp: 'Contragent',
        options: []
      }

    ]
  }
  getFilterObject(fullObj, key) {
    let uniq = [];
    fullObj.filter((obj) => {   
      if(!uniq.includes(obj.Vehicle[key]?.name) && obj.Vehicle[key]?.name) {
        uniq.push(obj.Vehicle[key]?.name);
      }
      return obj;
    })
    return uniq;
  }

  ngOnInit(): void {
    this.applyFilter('');
    this.applySearch('');
    this.filterSelectObj.forEach((o) => {
      o.options = this.getFilterObject(json, o.columnProp)
    })
  }

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {

      return data.id.toString().toLowerCase().includes(filter)
      || data.Vehicle?.name.toString().toLowerCase().includes(filter)
      || data.Vehicle.Organization?.name.toString().toLowerCase().includes(filter)
      || data.Vehicle.Department?.name.toString().toLowerCase().includes(filter)
      || data.Vehicle.Contragent?.name.toString().toLowerCase().includes(filter)
      || data.code1c.toString().toLowerCase().includes(filter)
      || data.Aggregate?.name.toString().toLowerCase().includes(filter)
      || data.Drivers.find(obj => {
        return obj.name?.toString().toLowerCase().includes(filter)
      })
    }
  }

  applyFilter(filterValue: string) {
    if (filterValue == "") {
      this.dataSource.filter = "";
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.Vehicle.Organization?.name.toString().toLowerCase().includes(filter)
        || data.Vehicle.Department?.name.toString().toLowerCase().includes(filter)
        || data.Vehicle.Contragent?.name.toString().toLowerCase().includes(filter)
      }
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.Vehicle.Organization?.name.toString().toLowerCase() === filter
      || data.Vehicle.Department?.name.toString().toLowerCase() === filter
      || data.Vehicle.Contragent?.name.toString().toLowerCase() === filter
    }
  }
  
  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'Vehicle.name': return item.Vehicle?.name;
        case 'Vehicle.Organization.name': return item.Vehicle.Organization?.name;
        case 'Vehicle.Department.name': return item.Vehicle.Department?.name;
        case 'Vehicle.Contragent.name': return item.Vehicle.Contragent?.name;
        default: return item[property];
      }
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}