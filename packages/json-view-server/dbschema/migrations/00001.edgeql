CREATE MIGRATION m1zwmaowxswjvsk6efm5jsrv7halxcxpwbtrlrhplx3zbhayhnsnnq
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY name -> std::str;
  };
};
