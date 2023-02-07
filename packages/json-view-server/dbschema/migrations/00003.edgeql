CREATE MIGRATION m1uottn2iqt5fjq3362ytcfwyjjsnjeuhwmaeprrdbebnpfdpk3ukq
    ONTO m1lwxsdrb32aci2drxurxzbf3ycwri7lpr2skghzgcw5kgokk74ayq
{
  CREATE TYPE default::File {
      CREATE REQUIRED LINK creator -> default::User;
      CREATE REQUIRED PROPERTY content -> std::str {
          CREATE CONSTRAINT std::max_len_value((1024 * 1024));
      };
      CREATE REQUIRED PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY filename -> std::str {
          CREATE CONSTRAINT std::max_len_value(255);
          CREATE CONSTRAINT std::min_len_value(1);
      };
      CREATE REQUIRED PROPERTY updated_at -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK files -> default::File {
          CREATE PROPERTY open_at -> std::datetime;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY name {
          RENAME TO token;
          CREATE CONSTRAINT std::exclusive;
          CREATE CONSTRAINT std::max_len_value(30);
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY username -> std::str {
          SET REQUIRED USING ('username');
          CREATE CONSTRAINT std::max_len_value(30);
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
};
