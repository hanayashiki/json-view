CREATE MIGRATION m1qkrvioknemrknshirczvlze2n3cojcmylggstsrkoz6rzhmxuwhq
    ONTO m1uottn2iqt5fjq3362ytcfwyjjsnjeuhwmaeprrdbebnpfdpk3ukq
{
  ALTER TYPE default::User {
      ALTER PROPERTY token {
          DROP CONSTRAINT std::max_len_value(30);
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY token {
          CREATE CONSTRAINT std::max_len_value(44);
      };
  };
};
