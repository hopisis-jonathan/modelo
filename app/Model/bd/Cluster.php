<?php
namespace bd;

use \PDO as PDO;

class Cluster extends PDO {
	private $dbhost;
	private $dbport;
	private $dbname;
	private $charset;
	
	private $dsn;
	private $username;
	private $password;
	
	public static $handle = null;
	
	function __construct( ) {
		try {
			$this->dbhost = "mysql.j4e.com.br";
			$this->dbport = 3306;
			$this->dbname = "j4e2";
			$this->charset = 'utf8' ;
			
			$this->dsn = "mysql:host={$this->dbhost};port={$this->dbport};dbname={$this->dbname};charset={$this->charset}";
			$this->username = "j4e2";
			$this->password = "j43200e*";

			if ( self::$handle == null ) {
				$dbh = parent::__construct( $this->dsn , $this->username , $this->password );
				self::$handle = $dbh;
				$this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$this->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
				return self::$handle;
			}
		}
		catch ( PDOException $e ) {
			echo 'Connection failed: ' . $e->getMessage();
			return false;
		}
	}

	function __destruct( ) {
		self::$handle = NULL;
	}
}
?>
