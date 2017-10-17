DROP TABLE IF EXISTS `xinfadi_search`;
CREATE TABLE `xinfadi_search` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniq_no` varchar(255) DEFAULT NULL,
  `farm_p_name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `p_type` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_no` (`uniq_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1495 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `xinfadi_show`;
CREATE TABLE `xinfadi_show` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniq_no` varchar(255) NOT NULL,
  `farm_p_name` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `min_price` float DEFAULT NULL,
  `avg_price` float DEFAULT NULL,
  `max_price` float DEFAULT NULL,
  `p_type` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `dt` date DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=453479 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `xinfadi_vegetables_kdd`;
CREATE TABLE `xinfadi_vegetables_kdd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniq_no` varchar(255) NOT NULL,
  `min_price` float DEFAULT NULL,
  `avg_price` float DEFAULT NULL,
  `max_price` float DEFAULT NULL,
  `pre_min_price` float DEFAULT NULL,
  `pre_avg_price` float DEFAULT NULL,
  `pre_max_price` float DEFAULT NULL,
  `one_min_price` float DEFAULT NULL,
  `one_avg_price` float DEFAULT NULL,
  `one_max_price` float DEFAULT NULL,
  `min_price_alpha` float DEFAULT NULL,
  `avg_price_alpha` float DEFAULT NULL,
  `max_price_alpha` float DEFAULT NULL,
  `min_price_at` float DEFAULT NULL,
  `avg_price_at` float DEFAULT NULL,
  `max_price_at` float DEFAULT NULL,
  `min_price_bt` float DEFAULT NULL,
  `avg_price_bt` float DEFAULT NULL,
  `max_price_bt` float DEFAULT NULL,
  `min_mape` float DEFAULT NULL,
  `avg_mape` float DEFAULT NULL,
  `max_mape` float DEFAULT NULL,
  `min_mse` float DEFAULT NULL,
  `avg_mse` float DEFAULT NULL,
  `max_mse` float DEFAULT NULL,
  `dt` date DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101031 DEFAULT CHARSET=utf8;
