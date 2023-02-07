CREATE MIGRATION m1lwxsdrb32aci2drxurxzbf3ycwri7lpr2skghzgcw5kgokk74ayq
    ONTO m1zwmaowxswjvsk6efm5jsrv7halxcxpwbtrlrhplx3zbhayhnsnnq
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY updated_at -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
