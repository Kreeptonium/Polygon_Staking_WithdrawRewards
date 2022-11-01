import Web3 from 'web3';
import dotenv from 'dotenv';
import {config} from "../../../settings";
import { IWithdrawRewardsOptions, IWithdrawRewardsRetValues } from '../Model/WthdrawRewardsResults';
dotenv.config();
//let encoded_tx;

export const withdrawRewards = async (params:IWithdrawRewardsOptions): Promise<IWithdrawRewardsRetValues> => {{ 
    /* #Note: Once withdrawal period is over delegators who've sold their shares can claim their matic tokens. Must transfer tokens to user. Once slashing is in place must check for all the slashing happened in that withdrawal period and take into account. */ 
    const web3 = new Web3(new Web3.providers.HttpProvider(config.MumbaiTestnet.providerURL)); 
    const buyDelegateABI = require('../../abi/ValidatorShareContract.json'); 
    let encoded_tx; 
    // Get contract instance 
    const validatorShareContract = new web3.eth.Contract(buyDelegateABI, params.validatorContractAddress); 
    try { 
        //Capturing the receipt for "Encoded ABI" 
        encoded_tx = await validatorShareContract.methods.withdrawRewards().encodeABI(); 
        let retVal:IWithdrawRewardsRetValues = {
             To:Web3.utils.toChecksumAddress(params.validatorContractAddress), 
             Value: 0, 
             Data:encoded_tx
             } 
        return retVal;

     } 
     
     catch (error) 
     {
         throw (error);
     }
        
    }};
         
    withdrawRewards({validatorContractAddress:'0x29f5406e20219f7e46806837e820cf7c2fa6d3ee'}).then((result)=>(console.log(result.Data)))