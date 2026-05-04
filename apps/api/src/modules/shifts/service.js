const Shift = require('../../models/Shift');
const Employee = require('../../models/Employee');

async function createShift(data) { return Shift.create(data); }
async function getShifts(companyId) { return Shift.find({ company: companyId, isActive: true }); }
async function updateShift(id, data) {
  const s = await Shift.findByIdAndUpdate(id, data, { new: true });
  if (!s) { const e = new Error('Shift not found'); e.statusCode = 404; throw e; }
  return s;
}
async function assignShift(shiftId, employeeIds) {
  await Employee.updateMany({ _id: { $in: employeeIds } }, { shift: shiftId });
  return { assigned: employeeIds.length };
}
module.exports = { createShift, getShifts, updateShift, assignShift };
