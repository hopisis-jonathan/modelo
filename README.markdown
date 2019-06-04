Sistema de Produtos Modelo

**Comandos DDL SQL

CREATE TABLE IF NOT EXISTS `crm_produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(45) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `crm_venda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `total` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `crm_venda_item` (
  `id_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_venda` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `qtde` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id_item`),
  KEY `fk_venda` (`id_venda`),
  KEY `fk_produto` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `crm_venda_item`
  ADD CONSTRAINT `fk_produto` FOREIGN KEY (`id_produto`) REFERENCES `crm_produto` (`id`),
  ADD CONSTRAINT `fk_venda` FOREIGN KEY (`id_venda`) REFERENCES `crm_venda` (`id`);

**Uso no Sistema

Framework Slim PHP
AngularJS
BootStrap
Gulp
Composer
PHP+HTML
CSS3

**Acesso ao modelo rodando

http://www.hopisis.com.br/modelo
