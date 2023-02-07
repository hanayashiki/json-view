module default {
  type User {
    required property username -> str {
      constraint min_len_value(1);
      constraint max_len_value(30);
    };
    required property token -> str {
      constraint min_len_value(1);
      constraint max_len_value(44);
      constraint exclusive;
    };
    required property created_at -> datetime {
      default := datetime_current();
    }
    required property updated_at -> datetime {
      default := datetime_current();
    }
    multi link files -> File {
      property open_at -> datetime; 
    };
  }

  type File {
    required link creator -> User;
    required property created_at -> datetime {
      default := datetime_current();
    }
    required property updated_at -> datetime {
      default := datetime_current();
    }
    required property filename -> str {
      constraint min_len_value(1);
      constraint max_len_value(255);
    }
    required property content -> str {
      constraint max_len_value(1024 * 1024);
    }
  }
}
