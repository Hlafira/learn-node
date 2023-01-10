import c from "config";

export class Region {
  constructor(id, id_mysql, id_register, name_ru, name_ukr, id_fb = 0) {
    this.id = id;
    this.id_mysql = id_mysql;
    this.id_register = id_register;
    this.name_ru = name_ru;
    this.name_ukr = name_ukr;
  }
}

export class Regions {
  constructor() {
    this.list = [];
  }

  addRegion(region) {
    this.list.push(region);
  }

  getById(id) {
    const fined = this.list.filter((el) => (el.id = id));
    if (fined.length > 0) return fined[0];
    return null;
  }

  getByNameRu(name_ru) {
    const fined = this.list.filter((el) => (el.name_ru = name_ru));
    if (fined.length > 0) return fined[0];
    return null;
  }

  getByNameRu(name_ukr) {
    const fined = this.list.filter((el) => (el.name_ukr = name_ukr));
    if (fined.length > 0) return fined[0];
    return null;
  }
}
