/**
 * Enum con todos los comandos de administrador sobre Usuarios
 */
export enum UserAdminComands {
  ShowUserAlphabetically = "Show Users alphabetically",
  ShowUserReversedAlphabetically = "Show Users alphabetically reversed",
  ShowUsersByWeekKilometers = "Show Users order by total kilometers in a week",
  ShowUsersByWeekKilometersReversed = "Show Users order by total kilometers in a week reversed",
  ShowUsersByMonthKilometers = "Show Users order by total kilometers in a month",
  ShowUsersByMonthKilometersReversed = "Show Users order by total kilometers in a month reversed",
  ShowUsersByYearKilometers = "Show Users order by total kilometers in a year",
  ShowUsersByYearKilometersReversed = "Show Users order by total kilometers in a year reversed",
  AddNewUser = "Add new User",
  RemoveUser = "Remove User",
  UpdateUser = "Update User",
}
