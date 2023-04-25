class InvalidImportedDataException(Exception):
    def __init__(self, message='Invalid imported data'):
        self.message = message
        super().__init__(self.message)

    pass
