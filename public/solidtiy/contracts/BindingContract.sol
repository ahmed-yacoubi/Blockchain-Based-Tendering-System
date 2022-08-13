// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract BindingContract {
    struct Company {
        uint64 companyId;
        address companyAddress;
        bytes16 name;
        bytes16 phoneNo;
    }

    struct Municipality {
        uint64 municipalityId;
        address municipalityAddress;
        bytes16 name;
        bytes16 phoneNo;
    }

    struct BindingData {
        uint64 bindingId;
        bytes32 name;
        uint64 startDate;
        uint64 endDate;
        bytes16[] details;
        uint8[] points;
        address municipalityAddress;
        bool isCanceled;
        bool isOpened;
        uint64 _winnerId;
        string tenderText;
    }

    struct RequestBinding {
        uint64 requestId;
        uint64 companyId;
        uint32 price;
        uint64 bindingId;
        bytes16[] details;
        address companyAddress;
        bool isWinner;
        string text;
        uint64 startDate;
        uint64 endDate;
    }

    //-------------------------------------------------------
    uint64 bindingContractCount;
    uint64 bindingRequestsCount;
    uint64 companyCount;
    uint64 municipalityCount;

    constructor() {
        bindingContractCount = 0;
        bindingRequestsCount = 0;
        companyCount = 0;
        municipalityCount = 0;
    }

    mapping(address => Company) public company;
    mapping(address => Municipality) public municipality;
    mapping(uint64 => BindingData) public bindingContracts;
    mapping(uint64 => RequestBinding) public bindingRequests;

    function signUp(
        bytes16 _name,
        bytes16 _phoneNo,
        uint8 _type
    ) public payable {
        if (getUserType() == -1) {
            if (_type == 0) {
                municipalityCount++;
                municipality[msg.sender] = Municipality(
                    municipalityCount,
                    msg.sender,
                    _name,
                    _phoneNo
                );
            } else {
                companyCount++;
                company[msg.sender] = Company(
                    companyCount,
                    msg.sender,
                    _name,
                    _phoneNo
                );
            }
        }
    }

    function createBindingContract(
        bytes32 _name,
        uint64 _startDate,
        uint64 _endDate,
        bytes16[] memory _details,
        uint8[] memory _points,
        string memory _tenderText
    ) public payable {
        require(
            _details.length == _points.length && getUserType() == 0,
            "error"
        );
        bindingContractCount++;
        bindingContracts[bindingContractCount] = BindingData(
            bindingContractCount,
            _name,
            _startDate,
            _endDate,
            _details,
            _points,
            msg.sender,
            false,
            false,
            0,
            _tenderText
        );
    }

    function getBindingById(uint64 bindingId)
        public
        view
        returns (BindingData memory)
    {
            return bindingContracts[bindingId];
    }

    function getBindings(uint8 _bidType, address _address)
        external
        view
        returns (BindingData[] memory)
    {
        BindingData[] memory _bindings = new BindingData[](
            bindingContractCount
        );
        address _deadAddress;
        uint64 counter = 0;
        for (uint64 i = 1; i <= bindingContractCount; i++) {
            if (_bidType == 1) {
                // get all binding
                if (
                    _address == _deadAddress ||
                    _address == bindingContracts[i].municipalityAddress
                ) {
                    _bindings[i - 1] = bindingContracts[i];
                    counter++;
                }
            } else if (_bidType == 2) {
                // get active binding
                if (
                    isActive(i) &&
                    !bindingContracts[i].isCanceled &&
                    !bindingContracts[i].isOpened
                )
                    if (
                        _address == _deadAddress ||
                        _address == bindingContracts[i].municipalityAddress
                    ) {
                        _bindings[i - 1] = bindingContracts[i];
                        counter++;
                    }
            } else if (_bidType == 3) {
                // get ended binding
                if (
                    !isActive(i) &&
                    !bindingContracts[i].isCanceled &&
                    !bindingContracts[i].isOpened
                )
                    if (
                        _address == _deadAddress ||
                        _address == bindingContracts[i].municipalityAddress
                    ) {
                        _bindings[i - 1] = bindingContracts[i];
                        counter++;
                    }
            } else if (_bidType == 4) {
                // get opened binding
                if (
                    !isActive(i) &&
                    !bindingContracts[i].isCanceled &&
                    bindingContracts[i].isOpened
                )
                    if (
                        _address == _deadAddress ||
                        _address == bindingContracts[i].municipalityAddress
                    ) {
                        _bindings[i - 1] = bindingContracts[i];
                        counter++;
                    }
            } else if (_bidType == 5) {
                // get all binding
                if (bindingContracts[i].isCanceled)
                    if (
                        _address == _deadAddress ||
                        _address == bindingContracts[i].municipalityAddress
                    ) {
                        _bindings[i - 1] = bindingContracts[i];
                        counter++;
                    }
            }
        }
        // BindingData[] memory _bindings1 = new BindingData[](counter);
        // _bindings1 = _bindings;
        // delete _bindings;
        return _bindings;
    }

    function openCanceleTender(
        uint64 _bindingId,
        uint64 _requestId,
        uint8 _type
    ) public payable {
        require(
            _bindingId <= bindingContractCount &&
                msg.sender ==
                bindingContracts[_bindingId].municipalityAddress &&
                !bindingContracts[_bindingId].isOpened &&
                !bindingContracts[_bindingId].isCanceled,
            "error"
        );
        if (_type == 0) {
            // open tender
            require(
                msg.sender ==
                    bindingContracts[bindingRequests[_requestId].bindingId]
                        .municipalityAddress &&
                    !bindingContracts[bindingRequests[_requestId].bindingId]
                        .isOpened &&
                    !bindingContracts[bindingRequests[_requestId].bindingId]
                        .isCanceled &&
                    _requestId <= bindingRequestsCount &&
                    bindingRequests[_requestId].bindingId == _bindingId &&
                    !isActive(_bindingId),
                "error"
            );
            {
                bindingContracts[_bindingId].isOpened = true;
                bindingContracts[_bindingId]._winnerId = _requestId;
                bindingRequests[_requestId].isWinner = true;
            }
        } else if (_type == 1) {
            //close tender
            bindingContracts[_bindingId].isCanceled = true;
        }
    }

    function isActive(uint64 bindingId) public view returns (bool) {
        if (bindingId <= bindingContractCount) {
            if (
                bindingContracts[bindingId].endDate >= block.timestamp &&
                bindingContracts[bindingId].startDate <= block.timestamp
            ) {
                return true;
            }
        }
        return false;
    }

    function getProfile(address _address, uint8 _type)
        public
        view
        returns (
            uint64 companyId,
            bytes16 name,
            bytes16 phoneNo
        )
    {
        if (_type == 0) {
            return (
                municipality[_address].municipalityId,
                municipality[_address].name,
                municipality[_address].phoneNo
            );
        } else {
            return (
                company[_address].companyId,
                company[_address].name,
                company[_address].phoneNo
            );
        }
    }

    function requestToBinding(
        uint64 _companyId,
        uint32 _price,
        uint64 _bindingId,
        bytes16[] memory _details,
        string memory _text,
        uint64 _startDate,
        uint64 _endDate
    ) public payable {
        bool reqested = false;
        for (uint64 i = 1; i <= bindingRequestsCount; i++) {
            if (
                bindingRequests[i].bindingId == _bindingId &&
                bindingRequests[i].companyId == _companyId
            ) {
                reqested = true;
                break;
            }
        }
        require(
            !reqested &&
                !bindingContracts[_bindingId].isOpened &&
                !bindingContracts[_bindingId].isCanceled &&
                isActive(_bindingId) &&
                _details.length <= getBindingById(_bindingId).details.length &&
                getUserType() == 1,
            "error"
        );
        bindingRequestsCount++;
        bindingRequests[bindingRequestsCount] = RequestBinding(
            bindingRequestsCount,
            _companyId,
            _price,
            _bindingId,
            _details,
            msg.sender,
            false,
            _text,
            _startDate,
            _endDate
        );
    }

    function getBindingRequestByRequestId(uint64 _requestId)
        public
        view
        returns (RequestBinding memory)
    {
        if (!isActive(bindingRequests[_requestId].bindingId))
            return bindingRequests[_requestId];
    }

    function getUserType() public view returns (int8) {
        if (municipality[msg.sender].municipalityId != 0) {
            return 0;
        }
        if (company[msg.sender].companyId != 0) {
            return 1;
        }
        return -1;
    }

    function getCountOf(uint64 _type) public view returns (uint64) {
        if (_type == 0) {
            return municipalityCount;
        } else if (_type == 1) {
            return companyCount;
        } else if (_type == 2) {
            return bindingContractCount;
        } else if (_type == 3) {
            return bindingRequestsCount;
        }
        return 0;
    }

    function getContractsRequest(address _companyAddress, uint64 _bindingId)
        public
        view
        returns (RequestBinding[] memory)
    {
        if (!isActive(_bindingId)) {
            RequestBinding[] memory _contractRequests = new RequestBinding[](
                bindingRequestsCount
            );
            uint64 counter = 0;
            address _deadAddress;
            for (uint64 i = 1; i <= bindingRequestsCount; i++) {
                if (
                    _companyAddress != _deadAddress &&
                    _bindingId == 0 &&
                    bindingRequests[i].companyAddress == _companyAddress
                ) {
                    _contractRequests[i - 1] = bindingRequests[i];
                    counter++;
                } else if (
                    _companyAddress == _deadAddress &&
                    _bindingId != 0 &&
                    bindingRequests[i].bindingId == _bindingId
                ) {
                    _contractRequests[i - 1] = bindingRequests[i];
                    counter++;
                }
            }
            // RequestBinding[] memory _contractRequests1 = new RequestBinding[](
            //     counter
            // );
            // _contractRequests1 = _contractRequests;
            // delete _contractRequests;
            return _contractRequests;
        }
    }

    function editInfo(
        uint8 _userType,
        uint8 _editType,
        bytes16 _value
    ) public payable {

        if (_userType == 0) {
            if (_editType == 0) municipality[msg.sender].name = _value;
            else municipality[msg.sender].phoneNo = _value;
        } else if (_userType == 1) {
            if (_editType == 0) company[msg.sender].name = _value;
            else company[msg.sender].phoneNo = _value;
        }
    }
}
